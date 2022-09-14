import '../theme/globals.css';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme/theme';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        console.log({ error });
        if ((error as any).message === 'JWT expired') {
          router.push('/sign-in');
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider supabaseClient={supabaseClient}>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
