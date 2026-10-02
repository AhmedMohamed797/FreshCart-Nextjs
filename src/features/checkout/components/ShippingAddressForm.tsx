"use client";

import {
  IconBuildingSkyscraper,
  IconMapPin,
  IconPhone,
  IconZip,
} from "@tabler/icons-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CheckoutSchemaType } from "../schemas/checkout.schema";

type ShippingAddressFormProps = {
  register: UseFormRegister<CheckoutSchemaType>;
  errors: FieldErrors<CheckoutSchemaType>;
};

export default function ShippingAddressForm({
  register,
  errors,
}: ShippingAddressFormProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
          <IconMapPin className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Delivery Address
          </h3>
          <p className="text-xs text-gray-500">
            Where should we send your order?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* City Input */}
        <div>
          <label
            htmlFor="city"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            City / Governorate <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <IconBuildingSkyscraper className="h-4 w-4" />
            </div>
            <input
              id="city"
              type="text"
              placeholder="e.g. Cairo, Giza, Alexandria"
              {...register("city")}
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-800 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                errors.city
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-primary-600 focus:ring-primary-100"
              }`}
            />
          </div>
          {errors.city && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <IconPhone className="h-4 w-4" />
            </div>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. 01012345678"
              {...register("phone")}
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-800 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-primary-600 focus:ring-primary-100"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Detailed Address Input */}
        <div className="sm:col-span-2">
          <label
            htmlFor="details"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Street Address & Details <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute top-3 left-3 text-gray-400">
              <IconMapPin className="h-4 w-4" />
            </div>
            <textarea
              id="details"
              rows={3}
              placeholder="Street name, building number, apartment/flat, landmark..."
              {...register("details")}
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-800 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 resize-none ${
                errors.details
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-primary-600 focus:ring-primary-100"
              }`}
            />
          </div>
          {errors.details && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.details.message}
            </p>
          )}
        </div>

        {/* Postal Code Input (Optional) */}
        <div className="sm:col-span-2">
          <label
            htmlFor="postalCode"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Postal / Zip Code <span className="text-xs font-normal text-gray-400">(Optional)</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <IconZip className="h-4 w-4" />
            </div>
            <input
              id="postalCode"
              type="text"
              placeholder="e.g. 11561"
              {...register("postalCode")}
              className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-800 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                errors.postalCode
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-primary-600 focus:ring-primary-100"
              }`}
            />
          </div>
          {errors.postalCode && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
