import { MutationOptions, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useAddUserToWaitListMutation = (options?: MutationOptions) => {
  return useMutation(['waitlist'], async (email: string) => {
    return await axios.post('/api/waitlist', { email });
  });
};
