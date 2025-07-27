import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Geist_Mono, Roboto } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/query-provider";

import "./globals.css";

const googleSans = Roboto({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Simple task management app created by Iskaa303",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(geistMono.className, googleSans.className, "antialiased min-h-screen")}
      >
        <NuqsAdapter>
          <Toaster richColors />
          <QueryProvider>
            {children}
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
