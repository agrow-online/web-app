import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiHandler } from 'next';
import { supabase } from '../../../modules/api/client';
import { Database } from '../../../types/database';

const handler: NextApiHandler = async (req, res) => {
  const { body, method } = req;

  console.log('got called');
  switch (method) {
    case 'POST':
      const response = await supabase.from('user_waitlist').insert(body);

      return res.status(response.status).json({ status: response.status });
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
