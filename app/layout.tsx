import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

// TOASTIFY NOTIFICATION
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarProvider from "@/components/own/navbar/navbarProvider";
import MainComponent from "@/components/own/afterLogin/mainComponent";
import Footer from "@/components/own/footer/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Buku Kas Masjid Agung Gamping",
  description: "Aplikasi Buku Kas pada Masjid Agung Gamping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Buku Kas Masjid Agung Gamping</title>
        <meta
          name="description"
          content="Aplikasi Buku Kas pada Masjid Agung Gamping"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Buku Kas Masjid Agung Gamping" />
        <meta
          property="og:description"
          content="Aplikasi Buku Kas pada Masjid Agung Gamping"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kasmasjidfix.vercel.app/" />
        <meta
          name="google-site-verification"
          content="T6zkOBnWNKnMML-OknWhEBrM6JVU7nMFUZRHuvZn6Jw"
        />
        <link rel="canonical" href="https://kasmasjidfix.vercel.app/" />
      </head>
      <body
        className={cn(
          "bg-background font-sans antialiased min-h-screen",
          fontSans.variable
        )}
      >
        <NavbarProvider />
        <MainComponent>{children}</MainComponent>
        <Footer />
        <ToastContainer
          position="bottom-right"
          theme="light"
          autoClose={1500}
        />
      </body>
    </html>
  );
}
