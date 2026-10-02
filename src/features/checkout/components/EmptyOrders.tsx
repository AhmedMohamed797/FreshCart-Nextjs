import { IconArrowRight, IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";

export default function EmptyOrders() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        <IconShoppingBag stroke={1.5} className="h-8 w-8" />
      </div>

      <h3 className="text-xl font-bold text-gray-900">No orders found</h3>
      <p className="mt-2 text-sm text-gray-500">
        You haven&apos;t placed any orders yet. Explore our wide collection of
        products and start filling your cart!
      </p>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 active:scale-[0.98]"
        >
          <span>Start Shopping</span>
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
