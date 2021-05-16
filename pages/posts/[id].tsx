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

const sliceDesc = (desc: string): string => {
  return desc.length > 120 ? desc.slice(0, 120).concat('...') : desc
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
  return (
    <Layout>
      <section className="bg-white p-5 md:p-10 mx-auto break-words md:w-2/3 lg:w-1/2">
        <Head>
          <title>{postData.title}</title>
          <meta
            name="description"
            content={sliceDesc(postData.desc)}
          />
          <meta
            property="og:description"
            content={sliceDesc(postData.desc)}
          />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              postData.title
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={postData.title} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <div className="font-extrabold text-3xl splatfont">
          {postData.title}
        </div>
        <div className="mt-6">
          <Date dateString={postData.date} />
        </div>
        <div className="mt-2 flex">
          {postData.tags.map(tag => (
            <div key={tag} className="bg-noshimehana text-white px-2 py-0.5 mr-2">
              <Link href={`/tags/${tag}`}>
                {tag}
              </Link>
            </div>)
          )}
        </div>
        <div className="mt-6">
          <article
            className="content text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
        <div className="mt-12">
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