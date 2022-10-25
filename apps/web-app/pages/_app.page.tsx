import '../theme/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme/theme';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from 'next/router';
import React, { Component, ErrorInfo, ReactNode, useState } from 'react';
import { ErrorBoundary } from '../modules/errors/error-boundary';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      onError: (error) => {
        console.log({});
      },
    },
    mutations: { retry: false },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if ((error as any).code === 'PGRST301') {
        router.push('/sign-in');
      }
    },
  }),
});

const App = ({ Component, pageProps }: AppProps<{ initialSession: Session }>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <ErrorBoundary>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="noindex" />
            <meta name="application-name" content="agrow" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </QueryClientProvider>
      </SessionContextProvider>
    </ErrorBoundary>
  );
};

export default App;
