import {
  VStack,
  Text,
  Box,
  Heading,
  Button,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Container,
  Link as ChakraLink,
  useToast,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { Typography } from '../components/typography';

const Home: NextPage = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/app/hub');
    }
  }, [user, router]);

  const mutation = useMutation(
    async (email: string) => {
      return await axios.post('/api/waitlist', { email });
    },
    {
      onSuccess: () =>
        toast({
          title: 'Fantastic!',
          description: "We'll notify you as soon as we launch.",
          status: 'success',
        }),
      onError: (error: any) => {
        if (error?.response?.data?.status === 409) {
          return toast({
            title: 'We love your enthusiasm!',
            description:
              "You're already on the waitlist, good things are in the making. We will notify you as soon as we launch.",
            status: 'info',
          });
        }
        return toast({
          title: 'Something went wrong',
          description: 'Please try again later',
          status: 'error',
        });
      },
    }
  );

  const signupForWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutation.mutate(email);
  };

  return (
    <>
      <Head>
        <title>agrow</title>
        <meta name="description" content="The operating system for farmer supply stores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="nav" position="fixed" right={0} top={0} padding={4}>
        <Link href="/sign-in" passHref>
          <Button as="a" width="120px">
            Sign in
          </Button>
        </Link>
      </Box>

      <VStack minHeight="100vh" justifyContent="center" padding={4} paddingTop="100px">
        <Box textAlign="center" justifySelf="baseline" marginBottom={16}>
          <Text textTransform="uppercase" color="#6b7280">
            Coming soon
          </Text>
          <Heading as="h1" size="2xl">
            agrow
          </Heading>
          <Heading as="h2" size="md" fontWeight="normal" mt={10} color="#6b7280">
            The operating system for farmer supply stores
          </Heading>
        </Box>
        <Box>
          <Heading as="h2" size="md" mb={8}>
            Sign up to be the first to know when we launch
          </Heading>

          <Container>
            <form onSubmit={signupForWaitlist}>
              <FormControl gap="8px">
                <FormLabel>Your email</FormLabel>
                <Input
                  type="email"
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  background="white"
                  borderWidth={0}
                  rounded="full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button width="full" mt="16px" type="submit" isLoading={mutation.isLoading}>
                  Join the waitlist!
                </Button>
                <FormHelperText mt={4}>
                  We&apos;ll never share your email, but we <strong>will</strong> send you amazing
                  updates.
                </FormHelperText>
              </FormControl>
            </form>
          </Container>
        </Box>
        <Box paddingTop="50px">
          <Typography.Body small fontWeight="bold">
            Questions? Talk to us!{' '}
            <ChakraLink
              href="mailto:hello@agrow.online?subject=👋"
              fontWeight="bold"
              color="brand.primary"
            >
              hello@agrow.online
            </ChakraLink>
          </Typography.Body>
        </Box>
      </VStack>
      <Box className="bubble" alignSelf="start" />
    </>
  );
};

export default Home;

export const getServerSideProps = withPageAuth({
  redirectTo: '/foo',
  authRequired: false,
  // @ts-ignore
  // TODO: raise issue, if no user lib returns undefined, which is a nono for NextJ
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
