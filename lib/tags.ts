import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir: string = path.join(process.cwd(), 'contents')

export type TagAndCount = { name: string, count: number }[]

export const getAllTagsAndCount = (): TagAndCount=> {
  const fileNames = fs.readdirSync(postsDir)
  const allTags: string[] = fileNames.flatMap(fileName => {
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return matterResult.data.tags
  })
  const tagAndCount = allTags.reduce(
    (acc: TagAndCount, currentValue: string) => {
      const count = allTags.filter(tag => currentValue === tag).length
      return {
        ...acc,
        count
      }
    } ,[] as TagAndCount
  )

  return tagAndCount
}

export const getAllTags = (): { params: { tag: string }}[] => {
  const fileNames = fs.readdirSync(postsDir)
  const allTags: string[] = fileNames.flatMap(fileName => {
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return matterResult.data.tags
  })
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags.map(tag => {
    return {
      params: { tag }
    }
  })
}
