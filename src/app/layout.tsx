import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SportNewsID - Berita Olahraga Terkini",
  description: "Platform berita olahraga terpercaya yang menyajikan informasi terkini, akurat, dan mendalam dari berbagai cabang olahraga.",
  keywords: ["sport news", "berita olahraga", "sepak bola", "basket", "badminton", "esports"],
  authors: [{ name: "SportNewsID Team" }],
  openGraph: {
    title: "SportNewsID - Berita Olahraga Terkini",
    description: "Platform berita olahraga terpercaya dengan liputan mendalam dari seluruh dunia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SportNewsID - Berita Olahraga Terkini",
    description: "Platform berita olahraga terpercaya dengan liputan mendalam dari seluruh dunia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
