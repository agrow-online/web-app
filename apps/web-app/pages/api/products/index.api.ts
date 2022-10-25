import { createServerSupabaseClient, withApiAuth } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../types/database';
import { DBProduct, Product } from '../../../types/products';
import { mapProductVariantsToProducts } from './utils';

export default withApiAuth(async function products(req, res) {
  const supabaseServerClient = createServerSupabaseClient<Database>({ req, res });
  const {
    query: { category },
    method,
  } = req;

  switch (method) {
    case 'GET':
      const { count } = await supabaseServerClient
        .from('product_variants')
        .select('*', { count: 'exact', head: true });

      const { data } = await supabaseServerClient
        .from('products')
        .select(
          `*, variants:product_variants!inner(*), 
              brand: product_brands!inner(id, name), 
              subCategory: product_sub_categories!inner(id, descriptiveName), 
              category: product_categories!inner(id, name))`
        )
        .order('name')
        .range(0, 50); // TODO pagination

      const products: Product[] = data ? mapProductVariantsToProducts(data) : [];

      return res.json({ products, count });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
