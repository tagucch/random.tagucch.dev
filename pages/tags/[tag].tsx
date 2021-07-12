import Link from 'next/link'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths
} from 'next'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { searchPostsByTag } from '../../lib/posts'
import { getAllTags } from '../../lib/tags'

const PostFilteredByTag = ({
  tag,
  posts
}: {
  tag: string,
  posts: {
    id: string,
    contentHtml: string,
    title: string,
    date: string,
    tags: string[]
  }[]
}) => {
  return (
    <Layout>
      <section className="text-xl pt-px mx-auto w-4/5 md:w-1/2 max-w-full break-words">
        <div className="mb-8 flex items-center">
          <div className="bg-noshimehana text-white dark:bg-darkbg-tag py-0.5 px-2 mr-1">{tag}</div> <div className=" dark:text-darktext">の記事一覧</div>
          <nav className="ml-auto splatfont">
            <Link href="/tags">
              <a className="text-noshimehana dark:text-darktext-title">→タグいちらん</a>
            </Link>
          </nav>
        </div>
        <ul className="list-none m-0 mx-auto">
          {posts.map(({ id, date, title }) => (
            <li className="mb-4 last:mb-0" key={id}>
              <div className="text-base tracking-wider dark:text-darktext-black">
                <Date dateString={date}></Date>
              </div>
              <Link href={`/posts/${id}`}>
                <a className="text-2xl splatfont dark:text-darktext-title">
                  {title.length > 35 ? title.slice(0, 35).concat('…') : title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default PostFilteredByTag

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTags()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const filteredPosts = searchPostsByTag(params?.tag as string)
  return {
    props: {
      tag: params.tag,
      posts: filteredPosts
    }
  }
}