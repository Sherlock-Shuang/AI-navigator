import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import CornerAI from "@/components/CornerAI";

export const metadata: Metadata = {
  title: "AI Navigator - AI工具导航",
  description: "发现最新的AI工具，加入社区讨论",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className="antialiased"
      >
        <AuthProvider>
          {children}
          <CornerAI />
        </AuthProvider>
      </body>
    </html>
  );
}
