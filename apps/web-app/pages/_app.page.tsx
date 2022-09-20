import '../theme/globals.css';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme/theme';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from 'next/router';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary } from '../module/errors/error-boundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UserProvider supabaseClient={supabaseClient}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="noindex" />
            <meta name="application-name" content="Agropreneur" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
