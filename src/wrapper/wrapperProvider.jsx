'use client';
import { SessionProvider } from 'next-auth/react';
import { createTheme, MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
        '#f8f3f2',
        '#e8e5e4',
        '#d4c8c4',
        '#bfa9a1',
        '#af8e84',
        '#a57d71',
        '#a17466',
        '#8d6255',
        '#7e574a',
        '#704a3d',
      ],
    },
    primaryColor: 'primary',
  });
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
            <Notifications position='top-right' autoClose={4000} />
            <SpotlightSearch />
            <NavContainer>{children}</NavContainer>
          </MantineProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
