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
