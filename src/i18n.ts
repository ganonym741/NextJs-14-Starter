import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import themeConfig from '../theme.config';

export const i18nConfig = {
    locales: ['en', 'id'] as const,
    defaultLocale: themeConfig.locale || 'en'
}

export type Locale = (typeof i18nConfig)['locales'][number];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!i18nConfig.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../public/locales/${locale}.json`)).default
  };
});