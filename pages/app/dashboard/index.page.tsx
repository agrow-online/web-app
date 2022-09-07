import { useUser } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { supabase } from '../../../utils/supabase';

const DashboardPage: NextPage = () => {
  const { user } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const use = await supabase.from('users').select('*').eq('authId', user?.aud);
    console.log(use);
  };
  return (
    <div className="center flex flex-col items-center justify-center border-slate-500 border-2">
      <div>hi</div>
      <div>d</div>
    </div>
  );
};

export default DashboardPage;
