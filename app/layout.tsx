import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Agras",
  description: "Sistema de gerenciamento de tarefas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased bg-[#FAFAFA]",
          poppins.variable
        )}
      >
        
          <div className="flex">
            <div className="sticky z-40 top-0 h-screen">
          
            </div>
            <div className="flex-1 flex flex-col">
              <div className="sticky top-0 z-30">
        
              </div>
              <main className="flex-1  z-30">{children}</main>
              <Toaster />
            </div>
          </div>
     
      </body>
    </html>
  );
}
