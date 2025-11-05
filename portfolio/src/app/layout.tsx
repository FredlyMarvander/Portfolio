import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Fredly Marvander | Software Developer",
  description:
    "I build meaningful web experiences and help others grow through technology — specializing in Next.js, React, and Node.js.",
  keywords: [
    "Next.js",
    "React",
    "Software Developer",
    "Portfolio",
    "Fredly Marvander",
  ],
  openGraph: {
    title: "Fredly Marvander | Software Developer",
    description:
      "A clean and modern portfolio showcasing Fredly Marvander’s projects, experience, and skills.",
    url: "https://fredly-portfolio.vercel.app",
    siteName: "Fredly Marvander Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/degghm3hf/image/upload/v1762317732/Screenshot_2025-11-05_at_11.40.13_bcgyzd.png",
        width: 1200,
        height: 630,
        alt: "Fredly Marvander Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fredly Marvander | Software Developer",
    description:
      "Explore my portfolio built with Next.js — clean design, modern tech stack, and meaningful web experiences.",
    images: [
      "https://res.cloudinary.com/degghm3hf/image/upload/v1762317732/Screenshot_2025-11-05_at_11.40.13_bcgyzd.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
