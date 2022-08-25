import '../styles/globals.css';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default App;
