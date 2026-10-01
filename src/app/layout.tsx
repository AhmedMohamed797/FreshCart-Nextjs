import Providers from "@/components/Providers/Providers";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { verifyToken } from "@/features/auth/server/auth.actions";
import { getCartItems } from "@/features/cart/server/cart.server";
import { CartValuesType } from "@/features/cart/slices/cart.slice";
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

  let cartValues: CartValuesType = {
    message: "",
    status: "success",
    numOfCartItems: 0,
    cartId: "",
    data: {
      products: [],
      totalCartPrice: 0,
    },
  };

  if (authStates.isAuthenticated) {
    const cartResponse = await getCartItems();
    if (cartResponse.status === "success") {
      cartValues = cartResponse;
    }
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers
          preloadedState={{ authReducer: authStates, cartReducer: cartValues }}
        >
          <Navbar />
          {children}

          <Toaster richColors theme="system" position="top-right" />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
