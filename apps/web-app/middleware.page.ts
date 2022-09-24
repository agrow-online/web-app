import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs';

console.log('AM I RUNNING');
export const middleware = withMiddlewareAuth({ redirectTo: '/sign-in' });

export const config = {
  matcher: '/app/:path*',
};
