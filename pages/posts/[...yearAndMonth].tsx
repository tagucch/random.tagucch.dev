import Link from 'next/link'
import Layout from '../../components/layout'
import SingleSelect from '../../components/singleSelect'
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import { getAllYearAndMonths, getPostsPerYearAndMonths, getYearAndMonthsSelectOptions } from '../../lib/posts'
import Date from '../../components/date'
import { useState } from 'react'
import Router from 'next/router'

const PostsPerYearAndMonths = ({
  postsPerYearAndMonth,
  months,
  currentYearAndMonth
}: {
  postsPerYearAndMonth: {
    id: string
    date: string
    title: string
    tags: string[]
  }[],
  months: { label: string, value: string }[],
  currentYearAndMonth: string
}) => {
  const currentOption = months.find(option => option.label === currentYearAndMonth)
  const [selectedOption, setSelectedOption] = useState(currentOption)
  const changeYearAndMonth = (selectedOption: { label: string; value: string }) => {
    setSelectedOption(selectedOption)
    Router.push('/posts/[...yearAndMonth]', `/posts/${selectedOption.value}`)
  }

  return (
    <Layout>
      <SingleSelect
        options={months}
        defaultValue={selectedOption}
        onChange={changeYearAndMonth}
      />
      <section className="text-xl pt-px mx-auto w-4/5 md:w-1/2 max-w-full break-words">
        <ul className="list-none m-0 mx-auto">
          {postsPerYearAndMonth.map(({ id, date, title, tags }) => (
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

export default PostsPerYearAndMonths

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllYearAndMonths()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const yearAndMonth = `${params?.yearAndMonth[0]}-${params?.yearAndMonth[1]}`
  const postsPerYearAndMonth = getPostsPerYearAndMonths(yearAndMonth)
  const months = getYearAndMonthsSelectOptions()
  return {
    props: {
      postsPerYearAndMonth,
      months,
      currentYearAndMonth: yearAndMonth
    }
  }
}