import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
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