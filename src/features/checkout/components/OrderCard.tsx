import {
  IconCalendar,
  IconMapPin,
  IconPhone,
  IconReceipt,
} from "@tabler/icons-react";
import Image from "next/image";
import { UserOrder } from "../types/checkout.types";
import OrderStatusBadge from "./OrderStatusBadge";

type OrderCardProps = {
  order: UserOrder;
};

export default function OrderCard({ order }: OrderCardProps) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50/70 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
            <IconReceipt className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">
                Order #{order.id}
              </span>
              <OrderStatusBadge
                type="method"
                value={order.paymentMethodType}
              />
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
              <IconCalendar className="h-3.5 w-3.5 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <OrderStatusBadge type="payment" value={order.isPaid} />
          <OrderStatusBadge type="delivery" value={order.isDelivered} />
        </div>
      </div>

      {/* Items List */}
      <div className="divide-y divide-gray-100 px-5">
        {order.cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 py-4 first:pt-4 last:pb-4"
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
              <Image
                src={item.product?.imageCover || "/placeholder.png"}
                alt={item.product?.title || "Product image"}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold text-gray-900">
                {item.product?.title}
              </h4>
              <p className="mt-0.5 text-xs text-gray-500">
                {item.product?.category?.name || "General"}
                {item.product?.brand?.name
                  ? ` • ${item.product.brand.name}`
                  : ""}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                <span>Quantity: {item.count}</span>
                <span>•</span>
                <span>{item.price.toLocaleString()} EGP each</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-bold text-gray-900">
                {(item.price * item.count).toLocaleString()} EGP
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info: Shipping Address & Total */}
      <div className="flex flex-col justify-between gap-4 border-t border-gray-100 bg-gray-50/50 p-5 sm:flex-row sm:items-center">
        {/* Shipping summary */}
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-1.5 font-medium text-gray-800">
            <IconMapPin className="h-3.5 w-3.5 text-primary-600" />
            <span>
              {order.shippingAddress?.city || "Cairo"} -{" "}
              {order.shippingAddress?.details}
            </span>
          </div>
          {order.shippingAddress?.phone && (
            <div className="flex items-center gap-1.5 text-gray-500">
              <IconPhone className="h-3.5 w-3.5 text-gray-400" />
              <span>{order.shippingAddress.phone}</span>
            </div>
          )}
        </div>

        {/* Pricing details */}
        <div className="flex items-baseline justify-between gap-6 sm:justify-end">
          <div className="text-xs text-gray-500 space-y-0.5 text-right">
            <div>
              Shipping:{" "}
              <span className="font-medium text-gray-700">
                {order.shippingPrice === 0
                  ? "Free"
                  : `${order.shippingPrice} EGP`}
              </span>
            </div>
            {order.taxPrice > 0 && (
              <div>
                Tax:{" "}
                <span className="font-medium text-gray-700">
                  {order.taxPrice} EGP
                </span>
              </div>
            )}
          </div>

          <div className="text-right">
            <span className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider">
              Total Order Price
            </span>
            <span className="text-lg font-extrabold text-primary-700">
              {order.totalOrderPrice.toLocaleString()} EGP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
