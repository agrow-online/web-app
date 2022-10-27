import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Product } from '../../../types/products';

export const useInventoryQuery = () => {
  return useQuery<{ products: Product[]; count: number }>(['products'], async () => {
    const response = await axios.get('/api/inventory');
    return response.data;
  });
};
