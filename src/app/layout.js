import { Poppins as poppinsFont } from 'next/font/google';
import '../styles/globals.scss';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import WrapperProvider from '@/wrapper/wrapperProvider';

const poppinsList = poppinsFont({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--poppins-font',
  style: ['normal'],
  fallback: 'Roboto',
});

export const metadata = {
  title: 'FleaPasal',
  description: 'Friendly Sustainable Style',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={poppinsList.className}>
        <WrapperProvider session={session}>{children}</WrapperProvider>
      </body>
    </html>
  );
}
