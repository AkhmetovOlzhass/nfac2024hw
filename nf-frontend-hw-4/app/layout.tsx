'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import HeaderElement from "./components/header";


const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          <HeaderElement/>
          <main className="flex min-h-screen flex-col p-24 bg-[#F2F4F5]">
            {children}
          </main>
        </body>
      </html>
      </QueryClientProvider>


  );
}
