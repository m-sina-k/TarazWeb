import type { Metadata } from "next";
import LocalFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers";

const raviFont = LocalFont({
  src: "../public/fonts/Ravi-Regular.woff2",
  variable: "--font-ravi",
});

export const metadata: Metadata = {
  title: "ترازوب",
  description: "سامانه مدیریت مالی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${raviFont.variable} ${raviFont.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
