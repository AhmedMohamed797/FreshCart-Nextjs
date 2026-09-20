import Providers from "@/components/Providers/Providers";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { verifyToken } from "@/features/auth/server/auth.actions";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freshcart | E-Commerce Store",
  description:
    "Freshcart is a modern e-commerce store built with Next.js, offering a seamless shopping experience with a wide range of products.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const authStates = await verifyToken();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers preloadedState={{ authReducer: authStates }}>
          <Navbar />
          {children}

          <Toaster richColors theme="system" position="top-right" />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
