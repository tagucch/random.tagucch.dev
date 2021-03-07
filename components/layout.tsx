import Head from 'next/head'
import Link from 'next/link'
import { title, desc } from '../site.conifg.json'

const Layout = ({
    children,
    home
  } : {
    children: React.ReactNode,
    home?: boolean
  }) => {
  return (
    // <div className={styles.container}>
    <div className="max-w-xl mx-auto p-4 mt-12 mb-24">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={desc}
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            title
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex flex-col items-center">
        {home ? (
          <h1 className="text-4xl font-extrabold my-4">{title}</h1>
        ) : (
          <h1 className="text-4xl font-extrabold my-4">
            <Link href="/">
              <a className="text-current hover:no-underline">{title}</a>
            </Link>
          </h1>
        )}
        <h2>{desc}</h2>
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back To Home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout