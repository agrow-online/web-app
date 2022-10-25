import { NextPage } from 'next';
import { useState, MouseEvent } from 'react';
import Head from 'next/head';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../modules/api/client';
import { Screen } from '../../components/screen/screen';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Typography } from '../../components/typography';

// TODO cleanup
const SignInPage: NextPage = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });

      if (error) throw error;
      toast({ title: 'Check your email inbox for the login link.', status: 'success' });
    } catch (error: any) {
      console.log({ error });
      let errorMessage = 'Something went wrong';
      if (error.status === 422) {
        errorMessage = 'The email seems invalid. Please try again.';
      }
      if (error.status === 429) {
        errorMessage = 'You can only request a login link once every minute. Try again later.';
      }
      if (error.status === 403) {
        errorMessage = "We currently don't allow new users. Try again later.";
      }
      toast({ title: errorMessage, status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen headerIsHidden contentIsCentered>
      <Head>
        <title>Sign in | agrow</title>
      </Head>

      <Screen.Content>
        <VStack maxWidth={['full', null, 'xs']} margin="auto">
          <Typography.Title>Sign in</Typography.Title>
          <form>
            <FormControl my={10}>
              <FormLabel color="brand.darkGrey">Email</FormLabel>

              <Input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                required
              />
              <FormHelperText color="brand.darkGrey">
                You&apos;ll receive a magic link in your mail inbox to login without a password.
              </FormHelperText>
            </FormControl>
            <Button type="submit" width="full" onClick={handleLogin} isLoading={isLoading}>
              Sign in
            </Button>
          </form>
        </VStack>
      </Screen.Content>
    </Screen>
  );
};

export default SignInPage;

export const getServerSideProps = withPageAuth({
  redirectTo: '/foo',
  authRequired: false,
  // @ts-ignore
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
