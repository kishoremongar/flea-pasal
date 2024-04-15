import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import StoreWrapper from '@/wrapper/storeWrapper';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import QueryClientWrapper from '@/wrapper/queryClientWrapper';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Collaborate 2.0',
  description: 'New way to collaborate',
};

const theme = createTheme({
  defaultGradient: {
    from: '#FF902F',
    to: '#FC6075',
    deg: 45,
  },
  colors: {
    'primary-orange': [
      '#fb7500',
      '#fb7500',
      '#fb7500',
      '#fb7500',
      '#fb7500',
      '#fb7500',
      '#fb7500',
      '#fb8219',
      '#fb9032',
      '#fc9e4c',
      '#fcac66',
      '#fdba7f',
      '#fdc799',
      '#fdd5b2',
      '#fee3cc',
    ],
  },
  primaryColor: 'primary-orange',
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <StoreWrapper>
          <QueryClientWrapper>
            <MantineProvider theme={theme}>
              <Notifications position='top-right' autoClose={4000} />
              {children}
            </MantineProvider>
          </QueryClientWrapper>
        </StoreWrapper>
      </body>
    </html>
  );
}
