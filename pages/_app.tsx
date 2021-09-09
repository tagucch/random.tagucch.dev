import { AppProps } from 'next/app'
import '../styles/global.css'
import 'prismjs/themes/prism-solarizedlight.css'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
