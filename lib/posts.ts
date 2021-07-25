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
const dirents: fs.Dirent[] = fs.readdirSync(postsDir, { withFileTypes: true })
const dirNames: string[] = dirents.flatMap(dirent => dirent.isDirectory() ? dirent.name : [])

export const getSortedPostData = (): Post[] => {
  const allPosts: Post[] = dirNames.map(dirName => {
    const fileNames = fs.readdirSync(`${postsDir}/${dirName}`)
    return fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(`${postsDir}/${dirName}`, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      return {
        id,
        ...matterResult.data as { date: string, title: string, tags: string[] }
      }
    })
  }).flat()

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
  const allPostsPromise = dirNames.map(dirName => {
    const fileNames = fs.readdirSync(`${postsDir}/${dirName}`)
    return fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const { title, desc, date, contentHtml: content } = await getPostData(id)

      return {
        id,
        content,
        desc,
        date,
        title,
      }
    })
  }).flat()

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
  return dirNames.map(dirName => {
    const fileNames = fs.readdirSync(`${postsDir}/${dirName}`)
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }).flat()
}

export const getPostData = async (id: string) => {
  const dirName = id.match(/\d{4}-\d{2}/)[0]
  const fullPath = path.join(`${postsDir}/${dirName}`, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
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
  const filteredPosts: Post[] = dirNames.flatMap(dirName => {
    const fileNames = fs.readdirSync(`${postsDir}/${dirName}`)
    return fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(`${postsDir}/${dirName}`, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      if(!matterResult.data.tags.includes(tag)) return []
      return {
        id,
        ...matterResult.data as { date: string, title: string, tags: string[] }
      }
    })
  }).flat()

  return filteredPosts
}