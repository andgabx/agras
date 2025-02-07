import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Se não houver sessão e a rota não for login/registro, redireciona para login
  if (!session && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Se houver sessão e estiver na página de login, redireciona para dashboard
  if (session && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
}