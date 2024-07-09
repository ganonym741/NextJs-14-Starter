'use client';

import { QueryClient } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { compress, decompress } from 'lz-string';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import {
  PersistQueryClientProvider,
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import React from 'react';
import { DayInNumber } from '@/utils/const';

export const queryClientOptions = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: DayInNumber,
      staleTime: DayInNumber,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  key: 'cache',
  serialize: (data) => compress(JSON.stringify(data)),
  deserialize: (data) => JSON.parse(decompress(data)),
});

const ReactQueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = React.useState(() => queryClientOptions);

  persistQueryClient({
    queryClient: queryClient,
    persister: persister,
    maxAge: DayInNumber,
    buster: '',
  });

  return (
    <PersistQueryClientProvider
      client={queryClientOptions}
      persistOptions={{ persister }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
};

export default ReactQueryProvider;
