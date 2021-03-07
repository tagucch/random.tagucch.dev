import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
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
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className="text-xl pt-px">
        <ul className="list-none p-0 m-0">
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