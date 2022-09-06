import '../theme/globals.css';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <ChakraProvider theme={theme}>
        <Toaster />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
};

export default App;
