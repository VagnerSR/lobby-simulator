import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import SocketsProvider from "@/context/socket.context";
import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic";
import HeaderLoad from "@/components/Header/HeaderLoad";
import Head from "next/head";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Header = dynamic(() => import("../components/Header/Header"), {
  ssr: false,
  loading: (loadingProps: DynamicOptionsLoadingProps) => <HeaderLoad />,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketsProvider>
      <div className={roboto.className}>
        <Head>
          <title>Lobby Simulator</title>
        </Head>
        <div className="background">
          <h5></h5>
          <h5></h5>
          <h5></h5>
          <h5></h5>
          <h5></h5>
          <h5></h5>
          <h5></h5>
          <h5></h5>
          <h5></h5>
          <h5></h5>
        </div>
        <Header />
        <Component {...pageProps} />
      </div>
    </SocketsProvider>
  );
}
