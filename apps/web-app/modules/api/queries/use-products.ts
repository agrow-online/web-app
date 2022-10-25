import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Product } from '../../../types/products';

export const useProductsQuery = () => {
  return useQuery<{ products: Product[]; count: number }>(['products'], async () => {
    const response = await axios.get('/api/products');
    return response.data;
  });
};
