import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SocketsProvider from '@/context/socket.context'
import Header from '@/components/Header/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketsProvider>
      <div className="font-[Fira-Code] bg-slate-800 h-screen">
        <Header />
        <Component {...pageProps} />
      </div>
    </SocketsProvider>
  )
}
