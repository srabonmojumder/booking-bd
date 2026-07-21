import type { Metadata } from "next";
import Footer from "@/components/footer/page";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { auth } from "~/auth"
import "./globals.css";
import "./custom.css";
import "./responsive.css";
import "./premium-dark.css";

export const metadata: Metadata = {
  title: "Booking BD — Cars, Flights, Hotels, Visa & Holidays",
  description:
    "Book cars, flights, hotels, visa and holidays across Bangladesh with Booking BD.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          {children}
          <div>
            <Footer />
          </div>
          <Toaster richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
