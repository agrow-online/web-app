import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs';

export const middleware = withMiddlewareAuth({ redirectTo: '/sign-in' });

export const config = {
  matcher: ['/app/:path*'],
};
