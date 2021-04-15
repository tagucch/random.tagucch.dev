import Link from 'next/link'
import Layout from '../components/layout'
import { getSortedPostData } from '../lib/posts'
import Date from '../components/date'

const Home = ({
  allPosts
}: {
  allPosts: {
    id: string
    date: string
    title: string
  }[]
}) => {
  return (
    <Layout home>
      <section className="text-xl pt-px mt-5">
        <ul className="list-none m-0 w-1/2 mx-auto min-w-max">
          {allPosts.map(({ id, date, title }) => (
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

export default Home

export const getStaticProps = async () => {
  const allPosts = getSortedPostData()
  return {
    props: {
      allPosts
    }
  }
}