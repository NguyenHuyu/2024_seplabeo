import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import { i18n } from '@/i18n.config'
import { updateSession } from '@/lib/updateSession'
import { adminRoutes, publicRoutes } from '@/routes'
import { getSession } from './hooks/getSession'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const locales = i18n.locales
  const locale = matchLocale(['vi'], locales, i18n.defaultLocale)
  return locale
}

function withI18nMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request)
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          request.url
        )
      )
    }

    return middleware(request, event)
  }
}
function extractFirstTwoPathSegments(url: string) {
  const parts = url.split('/')
  const firstTwoParts = parts.slice(2, 3)
  return '/' + firstTwoParts.join('/')
}

function extractPathCheckAdminOrUserRoute(url: string) {
  const parts = url.split('/')
  const firstTwoParts = parts.slice(2, 4)
  return '/' + firstTwoParts.join('/')
}

async function withAuthMiddleware(request: NextRequest) {
  await updateSession(request)

  const language = request?.nextUrl?.pathname?.split('/')[1] || 'vi'

  const session = await getSession()

  const isAdmin = session?.user.isAdmin === true

  const isPublicRoute = publicRoutes.includes(
    extractFirstTwoPathSegments(request.nextUrl.pathname)
  )

  const isNVDTRoute = adminRoutes.includes(
    extractPathCheckAdminOrUserRoute(request.nextUrl.pathname)
  )

  if (isAdmin && !isNVDTRoute && !isPublicRoute) {
    return NextResponse.json({
      message: 'You are not authorized to access this route'
    })
  }

  const response = NextResponse.next()
  response.cookies.set('language', language)
  return response
}

export default withI18nMiddleware(withAuthMiddleware)

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.ts|manifest.json|manifest.webmanifest|sitemap.xml|sitemap.txt|og-image.png|shortcut-icon.png|robots.txt|icon.tsx|icon.png|apple-icon.png).*)'
  ]
}
