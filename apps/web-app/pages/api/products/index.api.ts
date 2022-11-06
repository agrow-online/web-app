import { createServerSupabaseClient, withApiAuth } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../types/database';
import { DBProduct, Product } from '../../../types/products';
import { mapProductVariantsToProducts } from './utils';

export default withApiAuth(async function products(req, res) {
  const supabaseServerClient = createServerSupabaseClient({ req, res });
  const {
    query: { from: queryFrom, to: queryTo },
    method,
  } = req;

  const from = !!queryFrom
    ? Array.isArray(queryFrom)
      ? parseInt(queryFrom[0])
      : parseInt(queryFrom)
    : undefined;

  const to = !!queryTo
    ? Array.isArray(queryTo)
      ? parseInt(queryTo[0])
      : parseInt(queryTo)
    : undefined;

  switch (method) {
    case 'GET':
      const { count } = await supabaseServerClient
        .from('product_variants')
        .select('*', { count: 'exact', head: true });

      let query = supabaseServerClient
        .from('products')
        .select(
          `*, variants:product_variants!inner(*), 
              brand: product_brands!inner(id, name), 
              subCategory: product_sub_categories!inner(id, descriptiveName), 
              category: product_categories!inner(id, name))`
        )
        .order('name');

      if (from && to) {
        query.range(from, to);
      }

      const { data } = await query;

      //@ts-ignore
      const products: Product[] = data ? mapProductVariantsToProducts(data) : [];

      return res.json({ products, count });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
