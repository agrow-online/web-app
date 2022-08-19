import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
