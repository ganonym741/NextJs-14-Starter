import '@/app/global.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { GoogleAnalytics } from '@next/third-parties/google';

import ReactQueryProvider from '@/provider/query.provider';
import { PropsWithChildren } from 'react';
import { UserProvider } from '@/provider/user.provider';

export const metadata: Metadata = {
  title: 'NextJs 14 Starter',
  description: 'NextJs 14 Starter',
  icons: '',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html id="__next" suppressHydrationWarning>
        <head />
        <body
          className={'flex is-full min-bs-full flex-auto flex-col'}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2392ac97' fill-opacity='0.17' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
          }}
        >
          <UserProvider>
            <ReactQueryProvider>
                  {children}
              <ToastContainer />
            </ReactQueryProvider>
          </UserProvider>
        </body>
        {process.env.GOOGLE_ANALYTICS_KEY && (
          <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_KEY} />
        )}
      </html>
    </>
  );
}
