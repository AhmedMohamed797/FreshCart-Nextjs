"use client";

import Rating from "@/components/shared/Rating";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  removeProductToCart,
  updateProductQuantity,
} from "../server/cart.server";
import { cartActions } from "../slices/cart.slice";
import { CartItem as CartItemType } from "../types/cart.types";

export default function CartItem({
  productInfo,
}: {
  productInfo: CartItemType;
}) {
  const { count, product, price } = productInfo;
  const { id, category, imageCover, title, ratingsAverage } = product;

  const { setCartInfo } = cartActions;
  const dispatch = useDispatch();

  const [isUpdating, setIsUpdating] = useState(false);

  async function handleRemoveItemFromCart() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-xl border border-gray-100 p-6 bg-white",
        title: "text-xl font-bold text-gray-800 tracking-tight",
        htmlContainer: "text-gray-500 text-sm mt-2",
        icon: "scale-90 border-0",
        actions: "flex gap-3 mt-6",
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm shadow-sm",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await removeProductToCart(id);

        if (response.status === "fail" || response.status === "error") {
          toast.error(response.message);
          return;
        }

        if (response.status === "success") {
          dispatch(setCartInfo(response));
          toast.success(response.message);
        }
      }
    });
  }

  async function handleUpdateItemCount(newCount: number) {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const response = await updateProductQuantity(id, newCount);

      if (response.status === "fail" || response.status === "error") {
        toast.error(response.message);
        return;
      }

      if (response.status === "success") {
        dispatch(setCartInfo(response));
      }
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-green-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      {/* Left Section: Image & Product Details */}
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
          <Image
            src={imageCover}
            alt={title}
            fill
            sizes="64px"
            className="object-contain p-1 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Metadata */}
        <div className="flex flex-col justify-center">
          <h3 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
            <Link
              href={`/products/${id}`}
              className="line-clamp-1 hover:text-green-600 transition-colors"
            >
              {title}
            </Link>
          </h3>
          <div className="space-y-1">
            <span className="inline-block text-xs font-medium text-gray-500">
              {category?.name}
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <Rating rating={ratingsAverage} />
              <span className="font-semibold text-amber-600">
                {ratingsAverage}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Quantity Controls, Price & Delete */}
      <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-3 sm:border-t-0 sm:pt-0">
        {/* Quantity Controls */}
        <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5">
          <button
            onClick={() => handleUpdateItemCount(count - 1)}
            disabled={isUpdating}
            aria-label="Decrease quantity"
            className="rounded-md bg-white p-1.5 text-gray-600 shadow-sm transition-all hover:bg-green-50 hover:text-green-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconMinus stroke={2} className="h-3.5 w-3.5" />
          </button>
          <span className="w-9 text-center text-sm font-semibold text-gray-900">
            {count}
          </span>
          <button
            onClick={() => handleUpdateItemCount(count + 1)}
            disabled={isUpdating}
            aria-label="Increase quantity"
            className="rounded-md bg-white p-1.5 text-gray-600 shadow-sm transition-all hover:bg-green-50 hover:text-green-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconPlus stroke={2} className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Price & Delete Container */}
        <div className="flex items-center gap-3">
          <div className="text-right min-w-17.5">
            <span className="text-base font-bold text-green-600">
              {price} EGP
            </span>
          </div>

          <button
            onClick={handleRemoveItemFromCart}
            aria-label="Remove item"
            className="rounded-lg p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95"
          >
            <IconTrash stroke={2} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
