import Head from 'next/head'
import Link from 'next/link'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import { useEffect } from 'react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths
} from 'next'
import {
  TwitterShareButton,
  TwitterIcon,
  HatenaShareButton,
  HatenaShareCount,
  HatenaIcon,
  FacebookShareButton,
  FacebookShareCount,
  FacebookIcon,
} from 'react-share'
import { Twitter } from 'react-feather'
import { useTheme } from 'next-themes'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'

const baseUrl = process.env.NEXT_PUBLIC_HOST

const sliceDesc = (desc: string | null): string => {
  if (!desc) return ''
  return desc.length > 80 ? desc.slice(0, 80).concat('…') : desc
}

const Post = ({
  postData
}: {
  postData: {
    id: string,
    contentHtml: string,
    title: string,
    date: string,
    desc?: string,
    tags: string[]
  }
}) => {
  useEffect(() => {
    // prism.jsでのシンタックスハイライト
    Prism.highlightAll()

    // Twitterのwidget展開
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, [])

  const { theme } = useTheme()

  return (
    <Layout>
      <section className="bg-white dark:bg-darkbg-article p-5 md:p-10 mx-auto break-words md:w-2/3 lg:w-1/2">
        <Head>
          <title>{postData.title}</title>
          <meta
            name="description"
            key="description"
            content={sliceDesc(postData.desc)}
          />
          <meta
            property="og:description"
            key="og:description"
            content={sliceDesc(postData.desc)}
          />
          <meta
            property="og:image"
            key="og:image"
            content={`${baseUrl}/images/ogp.jpg`}
          />
          <meta name="og:title" key="og:title" content={postData.title} />
          <meta name="twitter:card" key="twitter:card" content="summary_large_image" />
        </Head>
        <div className="font-extrabold text-3xl splatfont text-gray-900 dark:text-darktext-title">
          {postData.title}
        </div>
        <div className="mt-6 dark:text-darktext-black">
          <Date dateString={postData.date} />
        </div>
        <div className="flex flex-wrap">
          {postData.tags.map(tag => (
            <div key={tag} className="bg-noshimehana dark:bg-darkbg-tag text-white dark:text-darktext px-2 py-0.5 mt-2 mr-2">
              <Link href={`/tags/${tag}`}>
                {tag}
              </Link>
            </div>)
          )}
        </div>
        <div className="mt-6">
          <article
            className="content text-sm md:text-base dark:text-darktext"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
        <div className="mt-8 dark:text-darktext-title flex flex-col">
          <TwitterShareButton
            url={`${baseUrl}/posts/${postData.id}`}
            title={postData.title}
            className="mb-3"
          >
            <TwitterIcon round size={40} />
          </TwitterShareButton>
          <FacebookShareButton
            url={`${baseUrl}/posts/${postData.id}`}
            title={postData.title}
            className="mb-3"
          >
            <FacebookIcon round size={40} />
          </FacebookShareButton>
          <FacebookShareCount  url={`${baseUrl}/posts/${postData.id}`}>
            {shareCount => <span className="dark:text-darktext">{shareCount}</span>}
          </FacebookShareCount>
          <HatenaShareButton
            url={`${baseUrl}/posts/${postData.id}`}
            title={postData.title}
          >
            <HatenaIcon round size={40} />
          </HatenaShareButton>
          <HatenaShareCount url={`${baseUrl}/posts/${postData.id}`}>
            {shareCount => <span className="dark:text-darktext">{shareCount}</span>}
          </HatenaShareCount>
        </div>
        <div className="mt-4">
          <Link href="/">
            <a className="splatfont text-2xl dark:text-darktext-title">← Back To Home</a>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const postData = await getPostData(params?.id as string)
  return {
    props: {
      postData
    }
  }
}