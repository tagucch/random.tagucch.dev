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
    <div className="mx-auto h-full min-h-screen bg-indigo-100 min-w-min">
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
      <header className="flex flex-col items-center bg-blue-200 pt-2 pb-5 splatfont">
        {home ? (
          <h1 className="text-4xl font-extrabold my-4">{title}</h1>
        ) : (
          <h1 className="text-4xl font-extrabold my-4">
            <Link href="/">
              <a className="text-current hover:no-underline">{title}</a>
            </Link>
          </h1>
        )}
        <h2 className="splatfont">{desc}</h2>
      </header>
      <main className="pb-10">{children}</main>
    </div>
  )
}

export default Layout