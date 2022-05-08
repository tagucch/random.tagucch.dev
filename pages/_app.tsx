import { AppProps } from 'next/app'
import '../styles/global.css'
import 'prismjs/themes/prism-solarizedlight.css'
import { ThemeProvider } from 'next-themes'

// (async () => {
//   if (theme === 'light') {
//     await import (/* webpackChunkName: "prismjs/themes/prism-tomorrow.css" */ 'prismjs/themes/prism-tomorrow.css')
//   }

// })()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
