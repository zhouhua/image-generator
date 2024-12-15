import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 获取当前路径
  const pathname = request.nextUrl.pathname
  
  // 如果已经在语言路径下，不需要重定向
  if (pathname.startsWith('/en')) {
    return NextResponse.next()
  }

  // 只有访问根路径和文档路径时进行语言重定向
  if (pathname === '/' || pathname === '/docs') {
    const locale = request.headers.get('accept-language')?.split(',')[0] || 'zh'
    const defaultLocale = locale.startsWith('zh') ? 'zh' : 'en'
    
    if (defaultLocale === 'en') {
      return NextResponse.redirect(
        new URL(
          pathname === '/' ? '/en' : '/en/docs',
          request.url
        )
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了:
     * 1. /api (API 路由)
     * 2. /_next (Next.js 内部路由)
     * 3. /static (静态文件)
     * 4. /favicon.ico (网站图标)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
} 