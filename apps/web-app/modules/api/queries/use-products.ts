import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getPagination } from '../../../pages/api/products/utils';

import { Product } from '../../../types/products';

export const useProductsQuery = (page = 0) => {
  const { from, to } = getPagination({ page });

  return useInfiniteQuery<{ products: Product[]; count: number }>({
    keepPreviousData: true,
    queryKey: ['products', page, from],

    queryFn: async () => {
      const response = await axios.get(`/api/products?from=${from}&to=${to}`);
      return response.data;
    },
  });
};
