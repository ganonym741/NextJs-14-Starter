import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import { i18nConfig } from './i18n';

const locales = i18nConfig.locales
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales});