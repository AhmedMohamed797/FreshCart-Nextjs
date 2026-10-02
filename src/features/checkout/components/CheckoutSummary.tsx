"use client";

import { CartItem } from "@/features/cart/types/cart.types";
import {
  IconCheck,
  IconCreditCard,
  IconLoader2,
  IconLock,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Image from "next/image";
import { PaymentMethodType } from "../types/checkout.types";

type CheckoutSummaryProps = {
  products: CartItem[];
  totalCartPrice: number;
  paymentMethod: PaymentMethodType;
  isSubmitting: boolean;
};

export default function CheckoutSummary({
  products,
  totalCartPrice,
  paymentMethod,
  isSubmitting,
}: CheckoutSummaryProps) {
  const hasItems = products && products.length > 0;
  const shippingFee = hasItems ? (totalCartPrice >= 500 ? 0 : 70) : 0;
  const tax = Math.trunc(totalCartPrice * 0.14);
  const finalTotal = totalCartPrice + tax + shippingFee;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
        <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
          {products.reduce((acc, item) => acc + item.count, 0)} items
        </span>
      </div>

      {/* Mini Cart Items Preview */}
      <div className="max-h-56 overflow-y-auto space-y-3 pr-1 divide-y divide-gray-50 mb-5 scrollbar-thin">
        {products.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-3 pt-3 first:pt-0"
          >
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                sizes="56px"
                className="object-cover"
              />
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-gray-800 text-[10px] font-bold text-white shadow">
                {item.count}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="truncate text-xs font-medium text-gray-800">
                {item.product.title}
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {item.product.category?.name}
              </p>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-normal">
                  {item.count} × {item.price} EGP
                </span>
                <span className="font-semibold text-gray-900">
                  {item.price * item.count} EGP
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Calculation */}
      <div className="space-y-2.5 border-t border-gray-100 pt-4 text-sm">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            {totalCartPrice.toLocaleString()} EGP
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-1.5">
            <span>Shipping</span>
            {shippingFee === 0 && (
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                FREE
              </span>
            )}
          </div>
          <span className="font-medium text-gray-900">
            {shippingFee === 0 ? (
              <span className="text-emerald-600 font-semibold">Free</span>
            ) : (
              `${shippingFee} EGP`
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Estimated Tax (14%)</span>
          <span className="font-medium text-gray-900">
            {tax.toLocaleString()} EGP
          </span>
        </div>

        <div className="border-t border-gray-100 pt-3.5 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-xl font-extrabold text-primary-700">
                {finalTotal.toLocaleString()} EGP
              </span>
              <p className="text-[10px] text-gray-400">Including VAT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting || !hasItems}
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-semibold text-white shadow-md transition-all duration-200 ${
            isSubmitting || !hasItems
              ? "cursor-not-allowed bg-gray-400 shadow-none opacity-80"
              : "bg-primary-600 hover:bg-primary-700 active:scale-[0.99] shadow-primary-600/20"
          }`}
        >
          {isSubmitting ? (
            <>
              <IconLoader2 className="h-4 w-4 animate-spin" />
              <span>Processing Order...</span>
            </>
          ) : paymentMethod === "cash" ? (
            <>
              <IconCheck stroke={2.5} className="h-4 w-4" />
              <span>Place Cash Order</span>
            </>
          ) : (
            <>
              <IconCreditCard stroke={2} className="h-4 w-4" />
              <span>Proceed to Stripe Payment</span>
            </>
          )}
        </button>
      </div>

      {/* Trust Badges */}
      <div className="mt-5 space-y-2 border-t border-gray-100 pt-5">
        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
            <IconLock className="h-3.5 w-3.5" />
          </div>
          <span>Guaranteed 256-bit secure checkout</span>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
            <IconTruckDelivery className="h-3.5 w-3.5" />
          </div>
          <span>Free delivery on orders over 500 EGP</span>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
            <IconShieldCheck className="h-3.5 w-3.5" />
          </div>
          <span>Official Route Academy FreshCart Guarantee</span>
        </div>
      </div>
    </div>
  );
}
