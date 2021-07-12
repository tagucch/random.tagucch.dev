import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths
} from 'next'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'

const baseUrl = process.env.NEXT_PUBLIC_HOST

const sliceDesc = (desc: string): string => {
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
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, [])

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
        <div className="mt-12">
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