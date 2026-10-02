import OrdersScreen from "@/features/checkout/screens/orders.screen";
import { getUserOrders } from "@/features/checkout/server/checkout.server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | FreshCart",
  description: "View and track all your FreshCart orders.",
};

export default async function AllOrdersPage() {
  const response = await getUserOrders();
  const initialOrders =
    response.status === "success" && Array.isArray(response.data)
      ? response.data
      : [];

  return (
    <OrdersScreen
      initialOrders={initialOrders}
      initialError={response.status === "fail" ? response.message : undefined}
    />
  );
}
