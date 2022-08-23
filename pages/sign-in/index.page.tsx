import { NextPage } from 'next';
import { useState } from 'react';
import { supabase } from '../../utils/supabase';

// TODO check type
const SignInPage: NextPage = () => {
  const sendMagicLink = async () => {
    const { data } = await supabase.auth.signInWithPasswordless({
      email: 'hello@example',
    });
  };

  return <div>Sign in</div>;
};

export default SignInPage;
