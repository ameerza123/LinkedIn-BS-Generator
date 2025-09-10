import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "BS Generator",
  description: "BS Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={sourceSans.className}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
