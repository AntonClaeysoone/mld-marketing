import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyLabelDesk – The operating system for record labels",
  description:
    "MyLabelDesk is the operating system for modern record labels, connecting catalog, royalties, projects and marketing into one powerful workspace.",
  keywords: [
    "MyLabelDesk",
    "record label software",
    "label management platform",
    "royalty accounting",
    "music catalog management",
    "music business tools",
  ],
  metadataBase: new URL("https://www.mylabeldesk.com"),
  openGraph: {
    title: "MyLabelDesk – The operating system for record labels",
    description:
      "Replace spreadsheets, email threads and disconnected tools with one connected workspace built for record labels.",
    url: "https://www.mylabeldesk.com",
    siteName: "MyLabelDesk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLabelDesk – The operating system for record labels",
    description:
      "One connected platform for catalog, royalties, projects and marketing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
