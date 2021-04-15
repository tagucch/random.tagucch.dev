import Head from 'next/head'
import Link from 'next/link'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths
} from 'next'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'

const Post = ({
  postData
}: {
  postData: {
    id: string,
    contentHtml: string,
    title: string,
    date: string,
    tags: string[]
  }
}) => {
  return (
    <Layout>
      <section className="flex flex-col m-0 w-3/5 mx-auto min-w-min mt-5 break-words">
        <Head>
          {postData.title}
        </Head>
        <div className="font-extrabold text-3xl splatfont">
          {postData.title}
        </div>
        <div className="mt-2 flex">
          {postData.tags.map(tag => {
            return (
            <div key={tag} className="bg-green-300 px-1 mr-2">
              <Link href={`/tags/${tag}`}>
                {tag}
              </Link>
            </div>)
          })}
        </div>
        <div className="mt-2">
          <Date dateString={postData.date} />
        </div>
        <div className="mt-3">
          <article
            className="content"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
        <div className="mt-2">
          <Link href="/">
            <a className="splatfont text-2xl">← Back To Home</a>
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