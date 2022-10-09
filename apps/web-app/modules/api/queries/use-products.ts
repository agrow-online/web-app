import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useProductsQuery = () => {
  return useQuery(['products'], async () => {
    const response = await axios.get('/api/products');
    return response.data;
  });
};
