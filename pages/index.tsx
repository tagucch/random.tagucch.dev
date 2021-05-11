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
      <section className="text-xl pt-px mx-auto w-4/5 md:w-1/2 max-w-full">
        <ul className="list-none m-0 mx-auto">
          {allPosts.map(({ id, date, title, tags }) => (
            <li className="mb-10 last:mb-0" key={id}>
              <div className="text-base tracking-wider">
                <Date dateString={date}></Date>
              </div>
              <Link href={`/posts/${id}`}>
                <a className="text-2xl splatfont">
                  {title.length > 35 ? title.slice(0, 35).concat('…') : title}
                </a>
              </Link>
              <div className="flex mt-2">
                {tags.map(tag => (
                  <div className="bg-green-300 text-base px-1.5 mr-2">
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