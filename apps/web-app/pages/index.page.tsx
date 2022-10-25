import { VStack, Text, Box, Heading, Button } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>agrow</title>
        <meta name="description" content="The operating system for farmer supply stores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack height="100vh" justifyContent="space-between">
        <Box as="nav" alignSelf="flex-end" padding={4}>
          <Link href="/sign-in" passHref>
            <Button as="a" width="120px">
              Sign in
            </Button>
          </Link>
        </Box>

        <Box textAlign="center" justifySelf="baseline">
          <Text textTransform="uppercase" color="#6b7280">
            Coming soon
          </Text>
          <Heading as="h1" size="2xl">
            agrow
          </Heading>
          <Heading as="h2" size="md" fontWeight="normal" my={10} color="#6b7280">
            The operating system for farmer supply stores
          </Heading>
        </Box>
        <Box className="bubble" alignSelf="start" />
      </VStack>
    </>
  );
};

export default Home;

export const getServerSideProps = withPageAuth({
  redirectTo: '/foo',
  authRequired: false,
  // @ts-ignore
  // TODO: raise issue, if no user lib returns undefined, which is a nono for NextJS
  async getServerSideProps(ctx, supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return {
        redirect: {
          permanent: false,
          destination: '/app/hub',
        },
      };
    }
  },
});
