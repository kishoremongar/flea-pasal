import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import WrapperProvider from '@/wrapper/wrapperProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Thrift',
  description: 'Stop and shop',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <WrapperProvider session={session}>{children}</WrapperProvider>
      </body>
    </html>
  );
}
