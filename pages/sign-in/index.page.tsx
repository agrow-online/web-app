import { NextPage } from 'next';
import { useState, MouseEvent } from 'react';
import toast from 'react-hot-toast';
import Head from 'next/head';
import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../utils/supabase';

// TODO cleanup
const SignInPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });

      if (error) throw error;
      toast.success('Check your email inbox for the login link.', { position: 'bottom-center' });
    } catch (error: any) {
      console.log({ error });
      let errorMessage = 'Something went wrong';
      if (error.status === 429) {
        errorMessage = 'You can only request a login link once every minute. Try again later.';
      }
      if (error.status === 403) {
        errorMessage = "We currently don't allow new users. Try again later.";
      }
      toast.error(errorMessage, { position: 'bottom-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col p-2">
      <Head>
        <title>Sign in - Agropreneur</title>
      </Head>
      <h2>Agropreneur</h2>
      <div className=" rounded-xl w-full m-2 md:max-w-lg">
        <form>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@example.com"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#4C4DDC] rounded text-white p-[12px] w-full hover:bg-[#7070f3]"
            onClick={(e) => handleLogin(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
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
