import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Agropreneur</title>
        <meta name="description" content="The operating system for farmer supply stores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen">
        <nav className="flex flex-row-reverse p-8">
          <Link href="/sign-in">
            <a className="ml-auto bg-[#4C4DDC] rounded text-white p-[12px]">Sign in</a>
          </Link>
        </nav>

        <main className="mt-[300px] bubble sm:container sm:mx-auto  mx-auto flex items-center flex-col justify-center format lg:format-lg text-center">
          <span className="uppercase">Coming soon</span>
          <h1>Agropreneur</h1>
          <p className="lead">The operating system for farmer supply stores</p>
        </main>
      </div>
    </>
  );
};

export default Home;
