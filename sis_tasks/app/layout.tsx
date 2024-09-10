import * as React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { ChakraProvider } from '@chakra-ui/react'
import {NextUIProvider} from '@nextui-org/react'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Registro de equipos",
  description: "Registro de equipos y aplicaciones",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ReactQueryProvider >
        <SessionProvider>
          <NextUIProvider>
          <ChakraProvider>
          {children}
          </ChakraProvider>
          </NextUIProvider>
        </SessionProvider> 
      </ReactQueryProvider>
        <ToastContainer/>
        </body>
    </html>
  );
}
