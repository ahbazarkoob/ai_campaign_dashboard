import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token') || localStorage.getItem('token');
  if (!token && request.nextUrl.pathname.startsWith('/campaigns')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/campaigns/:path*'],
};