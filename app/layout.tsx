import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AGRAS",
  description: "Sistema de gerenciamento de plantio",
};

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
            <div className="min-h-screen bg-background font-sans antialiased">{children}</div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
