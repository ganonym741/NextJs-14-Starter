import { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import { i18nConfig } from './i18n';

const publicPages = [
  '/',
  '/login',
  // (/secret requires auth)
];

const intlMiddleware = createMiddleware({
  ...i18nConfig,
  localePrefix: 'always',
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      async authorized({ req, token }) {
        return true
      },
    },
    pages: {
      signIn: '/',
      error: '/no-access',
    },
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${i18nConfig.locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
