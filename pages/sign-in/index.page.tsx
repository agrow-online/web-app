import { NextPage } from 'next';
import { useState, MouseEvent } from 'react';
import Head from 'next/head';
import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../utils/supabase';
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

// TODO cleanup
const SignInPage: NextPage = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });

      if (error) throw error;
      toast({ title: 'Check your email inbox for the login link.', status: 'success' });
    } catch (error: any) {
      console.log({ error });
      let errorMessage = 'Something went wrong';
      if (error.status === 429) {
        errorMessage = 'You can only request a login link once every minute. Try again later.';
      }
      if (error.status === 403) {
        errorMessage = "We currently don't allow new users. Try again later.";
      }
      toast({ title: errorMessage, status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen contentOnly>
      <Screen.Content>
        <Head>
          <title>Sign in - Agropreneur</title>
        </Head>

        <h2>Agropreneur</h2>
        <VStack>
          <FormControl>
            <FormLabel>Email</FormLabel>

            <Input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              required
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <Button width="full" onClick={handleLogin}>
            Submit
          </Button>
        </VStack>
      </Screen.Content>
    </Screen>
  );
};

export default SignInPage;

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
