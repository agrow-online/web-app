import { handleAuth } from '@supabase/auth-helpers-nextjs';

export default handleAuth({
  cookieOptions: { lifetime: 1 * 365 * 24 * 60 * 60 },
  logout: { returnTo: '/' },
});
