import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Lobby Simulator" />
        <meta property='og:title' content='Lobby Simulator' />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="/L.png" />
        <link rel="apple-touch-icon" href="/L.png" />

        <title>
          Lobby Simulator
        </title>
      </Head>
      <body className='bg-slate-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
