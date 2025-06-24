/* eslint-disable */
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.accessToken || 'your_fallback_secret';
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const url = req.nextUrl.clone();

  const isAuthPage = url.pathname.startsWith('/auth');
  const isDashboardPage = url.pathname.startsWith('/dashboard');
  if (!token && isDashboardPage) {
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token!, secret);
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    if (!exp || exp < now) {
      url.pathname = isAuthPage ? '/' : '/auth/signin';
      return NextResponse.redirect(url);
    }
    if (isAuthPage) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    if (isDashboardPage) {
      url.pathname = '/auth/signin';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
