import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import HeaderMain from './_components/header-main';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.ico', 
  },
};

const inter = Manrope({ subsets: ['latin'], weight: '400' });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
      <HeaderMain />
       <main > {children}</main>
      </body>
    </html>
  );
}
