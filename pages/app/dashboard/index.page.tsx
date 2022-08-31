import { useUser } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';

const DashboardPage: NextPage = () => {
  const t = useUser();

  console.log(t);
  return <div>Your dashboard</div>;
};

export default DashboardPage;
