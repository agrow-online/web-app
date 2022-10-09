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
      const { user } = await getUser({ req, res });

      const { data: business, error: businessError } = await supabaseServerClient({ req, res })
        .from<Business>('businesses')
        .select('*')
        .eq('userId', user.id);

      if (businessError) {
        throw new Error(businessError.message);
      }
      const { data: employees, error: employeesError } = await supabaseServerClient({ req, res })
        .from<User>('users')
        .select('*')
        .eq('belongsToBusinessId', business[0].id);
      if (employeesError) {
        throw new Error(employeesError.message);
      }
      const businessWithEmployees = { ...business[0], employees };
      console.log(businessWithEmployees);
      return res.json(businessWithEmployees);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
