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

export const getSortedPostData = (): Post[] => {
  const fileNames = fs.readdirSync(postsDir)
  const allPosts: Post[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
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
  const fileNames = fs.readdirSync(postsDir)
  const allPostsPromise = fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const postData = await getPostData(id)

    return {
      id,
      content: postData.contentHtml,
      desc: postData.desc,
      date: postData.date,
      title: postData.title
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
  const fileNames = fs.readdirSync(postsDir)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDir, `${id}.md`)
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
    desc: firstParagraph[1].replace(/<[^>]*>/g, ''),
    ...matterResult.data as { date: string, title: string, tags: string[] },
  }
}

export const searchPostsByTag = (tag: string): Post[] => {
  const fileNames = fs.readdirSync(postsDir)
  const filteredPosts: Post[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    if(!matterResult.data.tags.includes(tag)) return
    return {
      id,
      ...matterResult.data as { date: string, title: string, tags: string[] }
    }
  }).filter(post => post)

  return filteredPosts
}