// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/client/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YoloVibes 设计小屋",
  description: "独立设计师作品展示与约稿",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-screen`}>
        <Header />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}