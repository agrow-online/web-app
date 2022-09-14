import { NextRequest, NextResponse } from 'next/server';

// ! TODO replace current function middleware with commented code when issue fixed: https://github.com/supabase/auth-helpers/issues/237
// import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware';
// // export const middleware = withMiddlewareAuth({
// //   redirectTo: '/sign-in',
// // });

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('sb-access-token');
  const refreshToken = request.cookies.get('sb-refresh-token');
  let sbUser;

  if (!accessToken && !refreshToken) {
    // Not authenticated
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  try {
    const response = await fetch(String(new URL('/api/auth/user', request.url)), {
      headers: {
        Cookie: `sb-access-token=${accessToken}, sb-refresh-token=${refreshToken}`,
      },
    });
    const { user } = await response.json();
    sbUser = user;
    console.log(user);
  } catch (error) {
    console.error({ error });
    // Error fetching user data
    return NextResponse.redirect(new URL('/sign-in', request.url));
  } finally {
    if (!sbUser) {
      // Not authenticated
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    // Authenticated
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/app/:path*',
};
