import CheckoutScreen from "@/features/checkout/screens/checkout.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | FreshCart",
  description: "Complete your order securely on FreshCart.",
};

export default function CheckoutPage() {
  return <CheckoutScreen />;
}
