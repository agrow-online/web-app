import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { Business, User } from '../../../types/user';
import { supabase } from '../client';

const getUser = async (userId?: string | null) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] ?? null;
};

const getBusiness = async (userId: string) => {
  const { data: business, error: businessError } = await supabase
    .from<Business>('businesses')
    .select('*')
    .eq('userId', userId);

  if (businessError) {
    throw new Error(businessError.message);
  }

  const { data: employees, error: employeesError } = await supabase
    .from<User>('users')
    .select('*')
    .eq('belongsToBusinessId', business[0].id);

  if (employeesError) {
    throw new Error(employeesError.message);
  }

  const businessWithEmployees = { ...business[0], employees };
  return businessWithEmployees;
};
export const useProfileQuery = () => {
  const { user } = useUser();

  return useQuery(['user'], () => getUser(user?.id), {
    enabled: !!user?.id,
  });
};

export const useBusinessQuery = (userId: string) => {
  return useQuery(['business'], () => getBusiness(userId));
};
