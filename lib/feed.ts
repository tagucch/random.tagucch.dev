import fs from 'fs'
import { Feed } from 'feed'
import { getPostDataForFeed } from './posts'
import { title, desc } from '../site.conifg.json'

export const generateRssFeed = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_HOST ?? ''
  const date = new Date()
  const author = {
    name: 'tagucch',
    email: 'y.t.3k.gunners@gmail.com',
    link: 'https://twitter.com/tagucch'
  }

  const feed = new Feed({
    title,
    description: desc,
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    favicon: `${baseUrl}/favicon.ico`,
    image: `${baseUrl}/images/profile.png`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author
  })

  const posts = await getPostDataForFeed()

  posts.forEach(post => {
    const url = `${baseUrl}/${post.id}`
    feed.addItem({
      title: post.title,
      description: post.desc ?? '',
      id: url,
      link: url,
      content: post.content,
      date: new Date(post.date)
    })
  })

  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())

}