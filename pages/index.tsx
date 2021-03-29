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
      <section className="text-xl pt-px mt-5 splatfont">
        <ul className="list-none m-0 w-1/2 mx-auto min-w-max">
          {allPosts.map(({ id, date, title }) => (
            <li className="mr-4" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <Date dateString={date}></Date>
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