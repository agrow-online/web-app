import { withApiAuth, supabaseServerClient, getUser } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../../modules/api/client';
import { Business, User } from '../../../types/user';

export default withApiAuth(async function business(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      const { data, error } = await supabaseServerClient({ req, res })
        .from<Business>('products')
        .select('*, product_variants(*)');

      console.log({ data });
      return res.json(data);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
