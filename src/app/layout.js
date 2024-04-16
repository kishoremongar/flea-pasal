import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import StoreWrapper from '@/wrapper/storeWrapper';
import SessionProvider from '@/wrapper/sessionProvider';
import UserAuthWrapper from '@/wrapper/userAuthWrapper';
import QueryClientWrapper from '@/wrapper/queryClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Thrift',
  description: 'Stop and shop',
};

const theme = createTheme({
  defaultGradient: {
    from: '#FF902F',
    to: '#FC6075',
    deg: 45,
  },
  colors: {
    primary: [
      '#ff4f99',
      '#ff4f99',
      '#ff4f99',
      '#ff4f99',
      '#ff4f99',
      '#ff4f99',
      '#ff4f99',
      '#992f5b',
      '#b2376b',
      '#cc3f7a',
      '#fcac66',
      '#ff69a8',
      '#ff60a3',
      '#ff72ad',
      '#ff83b7',
    ],
  },
  primaryColor: 'primary',
});

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <StoreWrapper>
            <UserAuthWrapper />
            <QueryClientWrapper>
              <MantineProvider theme={theme}>
                <Notifications position='top-right' autoClose={4000} />
                {children}
              </MantineProvider>
            </QueryClientWrapper>
          </StoreWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
