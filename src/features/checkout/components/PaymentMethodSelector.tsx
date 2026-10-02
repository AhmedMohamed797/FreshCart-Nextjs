"use client";

import {
  IconCash,
  IconCheck,
  IconCreditCard,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { PaymentMethodType } from "../types/checkout.types";

type PaymentMethodSelectorProps = {
  selectedMethod: PaymentMethodType;
  onChange: (method: PaymentMethodType) => void;
};

export default function PaymentMethodSelector({
  selectedMethod,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Payment Method
          </h3>
          <p className="text-xs text-gray-500">
            Choose how you would like to pay for your order
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <IconShieldCheck className="h-3.5 w-3.5" />
          <span>Encrypted & Safe</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {/* Cash on Delivery Card */}
        <label
          onClick={() => onChange("cash")}
          className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4.5 transition-all duration-200 ${
            selectedMethod === "cash"
              ? "border-primary-600 bg-primary-50/30 shadow-sm ring-2 ring-primary-500/20"
              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
                  selectedMethod === "cash"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <IconCash stroke={2} className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold text-gray-900 block text-sm">
                  Cash on Delivery
                </span>
                <span className="text-xs text-gray-500">
                  Pay at your doorstep
                </span>
              </div>
            </div>

            <div
              className={`flex size-5 items-center justify-center rounded-full border transition-all ${
                selectedMethod === "cash"
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-gray-300 bg-white"
              }`}
            >
              {selectedMethod === "cash" && (
                <IconCheck stroke={3} className="h-3 w-3" />
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 text-[11px] text-gray-500">
            <IconTruckDelivery className="h-3.5 w-3.5 text-gray-400" />
            <span>Pay cash when the courier arrives</span>
          </div>
        </label>

        {/* Online Payment Card (Stripe) */}
        <label
          onClick={() => onChange("card")}
          className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4.5 transition-all duration-200 ${
            selectedMethod === "card"
              ? "border-primary-600 bg-primary-50/30 shadow-sm ring-2 ring-primary-500/20"
              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
                  selectedMethod === "card"
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <IconCreditCard stroke={2} className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-900 text-sm">
                    Credit / Debit Card
                  </span>
                  <span className="rounded bg-primary-100 px-1.5 py-0.5 text-[10px] font-bold text-primary-700">
                    Stripe
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Visa, MasterCard & more
                </span>
              </div>
            </div>

            <div
              className={`flex size-5 items-center justify-center rounded-full border transition-all ${
                selectedMethod === "card"
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-gray-300 bg-white"
              }`}
            >
              {selectedMethod === "card" && (
                <IconCheck stroke={3} className="h-3 w-3" />
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 text-[11px] text-gray-500">
            <IconShieldCheck className="h-3.5 w-3.5 text-gray-400" />
            <span>Instant confirmation via Stripe Checkout</span>
          </div>
        </label>
      </div>
    </div>
  );
}
