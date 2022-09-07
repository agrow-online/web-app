import { VStack, Text, Box, Heading, Button } from '@chakra-ui/react';
import { withPageAuth, getUser } from '@supabase/auth-helpers-nextjs';
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

      <VStack height="100vh" justifyContent="space-between">
        <Box as="nav" alignSelf="flex-end" padding={4}>
          <Link href="/sign-in">
            <Button>Sign in</Button>
          </Link>
        </Box>

        <Box textAlign="center" justifySelf="baseline">
          <Text textTransform="uppercase" color="#6b7280">
            Coming soon
          </Text>
          <Heading as="h1" size="2xl">
            Agropreneur
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
  authRequired: false,
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    if (user) {
      return {
        redirect: {
          permanent: false,
          destination: '/app/dashboard',
        },
      };
    }

    return { props: {} };
  },
});
