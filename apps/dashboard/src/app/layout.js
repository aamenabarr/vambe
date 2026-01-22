import { Inter } from 'next/font/google';
import React from 'react';
import 'ui/styles/globals.css';
import { Toaster } from 'ui';
import { cn } from 'ui/lib/utils';
export const metadata = {
    title: 'vambe',
    description: 'vambe',
};
const inter = Inter({ subsets: ['latin'] });
const Layout = async ({ children }) => {
    return (<html lang="es">
      <body className={cn(`${inter.className} h-screen`)}>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <Toaster />
        <div>{children}</div>
      </body>
    </html>);
};
export default Layout;
