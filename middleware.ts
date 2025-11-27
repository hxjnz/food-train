import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip middleware if environment variables are not set (build time)
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next({
      request,
    });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow guest access to home page and restaurant details
  const isPublicRoute = 
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/restaurants/') && !request.nextUrl.pathname.includes('/edit') && !request.nextUrl.pathname.endsWith('/new');

  // Protect routes that require authentication (except public routes)
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/signup') &&
    !isPublicRoute
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login/signup pages
  if (
    user &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/signup'))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

