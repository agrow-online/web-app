import { withApiAuth, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../types/database';
import { Business, User } from '../../../types/user';

export default withApiAuth(async function business(req, res) {
  const supabaseServerClient = createServerSupabaseClient<Database>({ req, res });

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      const {
        data: { user },
      } = await supabaseServerClient.auth.getUser();

      const { data: business, error: businessError } = await supabaseServerClient
        .from('businesses')
        .select('*')
        .eq('userId', user!.id);

      if (businessError) {
        throw new Error(businessError.message);
      }
      const { data: employees, error: employeesError } = await supabaseServerClient
        .from('users')
        .select('*')
        .eq('belongsToBusinessId', business[0].id);
      if (employeesError) {
        throw new Error(employeesError.message);
      }
      const businessWithEmployees = { ...business[0], employees };

      return res.json(businessWithEmployees);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
