import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

type Post = {
  id: string
  date: string
  title: string
  desc?: string
  tags: string[]
}

const postsDir: string = path.join(process.cwd(), 'contents')
const getFilePathList = (dirName: string): string[] => {
  return fs.readdirSync(dirName, { withFileTypes: true }).flatMap(dirent => {
    const path = `${dirName}/${dirent.name}`
    return dirent.isDirectory() ? getFilePathList(path) : path
  })
}

const filePathList = getFilePathList(postsDir)

export const getSortedPostData = (): Post[] => {
  const allPosts: Post[] = filePathList.map(filePath => {
      const id = path.parse(filePath).name
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const matterResult = matter(fileContents)
      return {
        id,
        ...matterResult.data as { date: string, title: string, tags: string[] }
      }
  })

  return allPosts.sort((post1, post2) => {
    if (post1.date < post2.date) {
      return 1
    } else {
      return -1
    }
  })
}

type PostForFeed = {
  id: string
  content: string,
  date: string
  title: string
  desc?: string
}

export const getPostDataForFeed = async () => {
  const allPostsPromise = filePathList.map(async (filePath) => {
    const id = path.parse(filePath).name
    const { title, desc, date, contentHtml: content } = await getPostData(id)

    return {
      id,
      content,
      desc,
      date,
      title,
    }
  })

  const allPosts: PostForFeed[] = await Promise.all(allPostsPromise)

  return allPosts.sort((post1, post2) => {
    if (post1.date < post2.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostIds = () => {
  return filePathList.map(filePath => {
      return {
        params: {
          id: path.parse(filePath).name
        }
      }
    })
}

export const getPostData = async (id: string) => {
  const filePath = filePathList.find(filePath => {
    return path.parse(filePath).name === id
  })
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content)
  
  const contentHtml = processedContent.toString()
  const firstParagraph = contentHtml.match(/<p>(.+)?<\/p>/)

  return {
    id,
    contentHtml,
    desc: firstParagraph?.[1].replace(/<[^>]*>/g, ''),
    ...matterResult.data as { date: string, title: string, tags: string[] },
  }
}

export const searchPostsByTag = (tag: string): Post[] => {
  const filteredPosts: Post[] = filePathList.flatMap(filePath => {
      const id = path.parse(filePath).name
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const matterResult = matter(fileContents)
      if(!matterResult.data.tags.includes(tag)) return []
      return {
        id,
        ...matterResult.data as { date: string, title: string, tags: string[] }
      }
  })

  return filteredPosts.sort((post1, post2) => {
    if (post1.date < post2.date) {
      return 1
    } else {
      return -1
    }
  })
}