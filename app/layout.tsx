"use client"; // Adicione esta linha no topo do arquivo

import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { useState, useEffect } from 'react';
import Loading from "@/components/loading/Loading";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading

  useEffect(() => {
    // Simula um tempo de carregamento (substitua pela sua lógica real)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="min-h-screen bg-background font-sans antialiased">{children}</div>
            )}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}