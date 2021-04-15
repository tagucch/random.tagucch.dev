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
  posts
}: {
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
      <section className="text-xl pt-px mt-5">
        <ul className="list-none m-0 w-1/2 mx-auto min-w-max">
          {posts.map(({ id, date, title }) => (
            <li className="mr-4 mb-4 last:mb-0" key={id}>
              <div className="text-base tracking-wider">
                <Date dateString={date}></Date>
              </div>
              <Link href={`/posts/${id}`}>
                <a className="text-2xl splatfont">{title}</a>
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
      posts: filteredPosts
    }
  }
}