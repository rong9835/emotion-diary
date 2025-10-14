'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then((mod) => ({
      default: mod.ReactQueryDevtools,
    })),
  { ssr: false }
);

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5분 동안 캐시 유지
            staleTime: 1000 * 60 * 5,
            // 네트워크 재연결 시 자동 refetch
            refetchOnWindowFocus: false,
            // 컴포넌트 마운트 시 자동 refetch
            refetchOnMount: true,
            // 에러 발생 시 재시도 횟수
            retry: 1,
          },
          mutations: {
            // 뮤테이션 에러 발생 시 재시도 횟수
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
