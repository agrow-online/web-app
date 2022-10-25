import { background } from '@chakra-ui/react';
import { createServerSupabaseClient, withApiAuth } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../../modules/api/client';
import { Database } from '../../../types/database';
import { Business, User } from '../../../types/user';

export default withApiAuth(async function products(req, res) {
  const supabaseServerClient = createServerSupabaseClient<Database>({ req, res });

  const {
    query: { productId },
    method,
  } = req;

  switch (method) {
    case 'GET':
      const { data, error } = await supabaseServerClient
        .from('product_variants')
        .select(
          '*, product:products(*, brand:product_brands!inner(name), subCateogory: product_sub_categories!inner(id, descriptiveName, category:product_categories!inner(id, descriptiveName)))'
        )

        .eq('id', productId as string);

      data?.map((productVariant) => {
        const { product } = productVariant;

        return {
          name: product.name,
          description: product.description,
        };
      });
      return res.json(data);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
