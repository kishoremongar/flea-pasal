'use client';
import { SessionProvider } from 'next-auth/react';
import { createTheme, MantineProvider } from '@mantine/core';
import NextTopLoader from 'nextjs-toploader';
import { Provider as ReduxProvider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import store from '@/store/store';
import SpotlightSearch from '@/components/common/spotlightSearch';
import NavContainer from '@/app/home/navContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function WrapperProvider({ session, children }) {
  const theme = createTheme({
    defaultGradient: {
      from: '#FF902F',
      to: '#FC6075',
      deg: 45,
    },
    colors: {
      primary: [
        '#fff4e8',
        '#efe6de',
        '#d8ccc3',
        '#c0b0a3',
        '#ac9789',
        '#a08877',
        '#A69080',
        '#876e5c',
        '#79614f',
        '#6c523f',
      ],
    },
    primaryColor: 'primary',
  });

  const pathname = usePathname();
  const isAuthNestedRoute = pathname.startsWith('/auth');
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
            <Notifications position='top-right' autoClose={4000} />
            <SpotlightSearch />
            <NextTopLoader showSpinner={false} />
            {isAuthNestedRoute ? (
              <>{children}</>
            ) : (
              <NavContainer>{children}</NavContainer>
            )}
          </MantineProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
