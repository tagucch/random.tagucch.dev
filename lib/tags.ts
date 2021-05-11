import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir: string = path.join(process.cwd(), 'contents')

export type TagsAndCounts = { tagName: string, count: number }[]

export const getAllTagsAndCount = (): TagsAndCounts => {
  const fileNames = fs.readdirSync(postsDir)
  const allTags: string[] = fileNames.flatMap(fileName => {
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return matterResult.data.tags
  })
  const tagsAndCounts = [...new Set(allTags)].reduce(
    (acc: TagsAndCounts, currentValue: string) => {
      const count = allTags.filter(tag => currentValue === tag).length
      return [
        ...acc, {
          tagName: currentValue,
          count
        }
      ] 
    } ,[] as TagsAndCounts
  )

  return tagsAndCounts
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
