import { useRouter } from 'next/router';
import { useTransition } from 'react';

import { Locale } from '@/i18n';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export default function LocaleSwitcherSelect({
  localeSelected,
  pathname,
  params
}: {
  localeSelected: Locale;
  pathname: string;
  params: Params
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  startTransition(() => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: localeSelected }
    );
  });

  return isPending;
}
