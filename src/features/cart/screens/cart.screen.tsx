"use client";

import { appState } from "@/store/store";
import {
  IconArrowLeft,
  IconShieldHalf,
  IconShoppingBag,
  IconShoppingCart,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Swal from "sweetalert2";
import CartItem from "../components/CartItem";
import { clearCart } from "../server/cart.server";
import { cartActions } from "../slices/cart.slice";

export default function CartScreen() {
  const cartItems = useSelector((appState: appState) => appState.cartReducer);

  const { setCartInfo } = cartActions;
  const dispatch = useDispatch();

  async function handleClearCart() {
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
        const response = await clearCart();

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

  if (cartItems.status === "fail" || cartItems.status === "error") {
    return (
      <div className="container py-24">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm border border-gray-100">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <IconShoppingCart stroke={2} className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Unable to load cart
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {cartItems.message ||
              "Something went wrong while fetching your cart items. Please try again."}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-700"
          >
            <IconArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.status === "success") {
    const {
      numOfCartItems,
      data: { totalCartPrice, products },
    } = cartItems;

    const hasItems = products && products.length > 0;
    const shippingFee = hasItems ? (totalCartPrice >= 500 ? 0 : 70) : 0;
    const tax = Math.trunc(totalCartPrice * 0.14);
    const finalTotal = totalCartPrice + tax + shippingFee;

    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Section - Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2.5">
                    <IconShoppingBag
                      stroke={2}
                      className="h-5 w-5 text-green-600"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Shopping Cart
                    </h1>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"}{" "}
                      in your cart
                    </p>
                  </div>
                </div>
              </div>

              {/* Cart Items List */}
              {hasItems ? (
                <div className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="py-4 first:pt-0 last:pb-0"
                    >
                      <CartItem productInfo={product} />
                    </div>
                  ))}

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <IconArrowLeft className="h-4 w-4" /> Continue Shopping
                    </Link>
                    <button
                      onClick={handleClearCart}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 active:scale-[0.98]"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                    <IconShoppingCart stroke={1.5} className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Your cart is empty
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Explore our catalog and add items to your cart to get
                      started.
                    </p>
                  </div>
                  <Link
                    href="/"
                    className="mt-2 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Order Summary
              </h2>

              {/* Summary Items */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {totalCartPrice} EGP
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shippingFee === 0 ? (
                      <span className="text-green-600 font-bold">Free</span>
                    ) : (
                      `${shippingFee} EGP`
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <span className="text-sm text-gray-600">
                    Estimated Tax (14%)
                  </span>
                  <span className="font-semibold text-gray-900">{tax} EGP</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-100">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-green-700">
                    {finalTotal} EGP
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href={hasItems ? "/checkout" : "#"}
                  className={`w-full block rounded-xl px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition-all ${
                    hasItems
                      ? "bg-green-600 hover:bg-green-700 hover:shadow-green-100 active:scale-[0.98]"
                      : "cursor-not-allowed bg-gray-300 shadow-none"
                  }`}
                >
                  Proceed to Checkout
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 rounded-lg p-2 transition-all hover:bg-gray-50">
                  <div className="flex size-9 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <IconTruckDelivery stroke={2} className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900">
                      Free Delivery
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Orders 500 EGP or more
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg p-2 transition-all hover:bg-gray-50">
                  <div className="flex size-9 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <IconShieldHalf stroke={2} className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900">
                      Secure Payment
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      100% protected checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
