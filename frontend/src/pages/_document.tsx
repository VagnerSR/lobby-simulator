import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Lobby Simulator" />
        <meta property='og:title' content='Lobby Simulator' />
        <meta name="theme-color" content="#0f172a" />
        <link rel="shortcut icon" href="/L.png" />
        <link rel="apple-touch-icon" href="/L.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
