import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Suspense } from "react";
import SocketsProvider from '@/context/socket.context'
import dynamic, { DynamicOptionsLoadingProps } from 'next/dynamic'
import HeaderLoad from '@/components/Header/HeaderLoad'

const Header = dynamic(() => import('../components/Header/Header'), {
  ssr: false,
  loading: ((loadingProps: DynamicOptionsLoadingProps) => <HeaderLoad />)
})

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
