import Link from 'next/link'
import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import { getSortedPostData } from '../lib/posts'
import Date from '../components/date'

const Home = ({
  allPosts
}: {
  allPosts: {
    id: string
    date: string
    title: string
    tags: string[]
  }[]
}) => {
  return (
    <Layout home>
      <section className="text-xl pt-px mx-auto w-4/5 md:w-1/2 max-w-full break-words">
        <ul className="list-none m-0 mx-auto">
          {allPosts.map(({ id, date, title, tags }) => (
            <li className="mb-8 last:mb-0" key={id}>
              <div className="text-base tracking-wider dark:text-darktext-black">
                <Date dateString={date}></Date>
              </div>
              <Link href={`/posts/${id}`}>
                <a className="text-2xl splatfont text-gray-900 dark:text-darktext-title">
                  {title.length > 35 ? title.slice(0, 35).concat('…') : title}
                </a>
              </Link>
              <div className="flex flex-wrap mt-2">
                {tags.map(tag => (
                  <div key={tag} className="bg-noshimehana dark:bg-darkbg-tag text-white dark:text-darktext text-base px-1.5 mr-2 mb-2">
                    <Link href={`/tags/${tag}`}>
                      {tag}
                    </Link>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getSortedPostData()
  return {
    props: {
      allPosts
    }
  }
}