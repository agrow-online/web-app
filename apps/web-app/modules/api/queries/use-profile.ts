import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Business, User } from '../../../types/user';
import { supabase } from '../client';

const getUser = async (userId?: string | null) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] ?? null;
};

export const useProfileQuery = () => {
  const { user } = useUser();

  return useQuery(['user'], () => getUser(user?.id), {
    enabled: !!user?.id,
  });
};

export const useBusinessQuery = () => {
  return useQuery(['business'], async () => {
    const response = await axios.get('/api/profiles/me');
    return response.data;
  });
};
