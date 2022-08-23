import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Agropreneur</title>
        <meta name="description" content="The operating system for farmer supply stores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bubble sm:container sm:mx-auto p-10 mx-auto flex items-center flex-col justify-center h-screen format lg:format-lg text-center">
        <span className="uppercase">Coming soon</span>
        <h1>Agropreneur</h1>
        <p className="lead">The operating system for farmer supply stores</p>
      </main>
    </>
  );
};

export default Home;
