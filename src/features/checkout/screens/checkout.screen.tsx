"use client";

import { cartActions } from "@/features/cart/slices/cart.slice";
import { appState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconArrowLeft,
  IconCircleCheckFilled,
  IconShieldLock,
  IconShoppingCart,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Swal from "sweetalert2";
import CheckoutSummary from "../components/CheckoutSummary";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import ShippingAddressForm from "../components/ShippingAddressForm";
import { checkoutSchema, CheckoutSchemaType } from "../schemas/checkout.schema";
import {
  createCashOrder,
  createOnlinePaymentSession,
} from "../server/checkout.server";
import { PaymentMethodType } from "../types/checkout.types";

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartState = useSelector((state: appState) => state.cartReducer);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: "Cairo",
      phone: "",
      details: "",
      postalCode: "",
      paymentMethod: "cash",
    },
  });

  const selectedPaymentMethod = watch("paymentMethod");

  const handlePaymentMethodChange = (method: PaymentMethodType) => {
    setValue("paymentMethod", method, { shouldValidate: true });
  };

  const onSubmit = async (values: CheckoutSchemaType) => {
    if (!cartState.cartId) {
      toast.error("Cart not found. Please refresh or add items to your cart.");
      return;
    }

    setIsSubmitting(true);

    try {
      const shippingAddress = {
        details: values.details.trim(),
        phone: values.phone.trim(),
        city: values.city.trim(),
        postalCode: values.postalCode?.trim() || undefined,
      };

      if (values.paymentMethod === "cash") {
        const response = await createCashOrder(
          cartState.cartId,
          shippingAddress,
        );

        if (response.status === "success") {
          // Reset Redux cart
          dispatch(cartActions.resetCart());

          // Success notification
          await Swal.fire({
            icon: "success",
            title: "Order Placed Successfully!",
            html: `
              <p class="text-sm text-gray-600 mt-2">
                Thank you for your order! Your Cash on Delivery order 
                <strong class="text-primary-700">#${response.data?.id || ""}</strong> 
                has been placed and will be delivered to your address soon.
              </p>
            `,
            confirmButtonText: "View My Orders",
            buttonsStyling: false,
            customClass: {
              popup: "rounded-2xl p-6 bg-white shadow-xl border border-gray-100",
              title: "text-xl font-bold text-gray-900 tracking-tight",
              confirmButton:
                "bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all shadow-sm",
            },
          });

          router.push("/allorders");
        } else {
          toast.error(response.message || "Failed to place order.");
        }
      } else {
        // Online Payment via Stripe
        const originUrl =
          typeof window !== "undefined"
            ? window.location.origin
            : "http://localhost:3000";

        const response = await createOnlinePaymentSession(
          cartState.cartId,
          shippingAddress,
          originUrl,
        );

        if (response.status === "success" && response.session?.url) {
          // Reset cart in anticipation of payment completion
          dispatch(cartActions.resetCart());

          toast.success("Redirecting to Stripe secure checkout...");
          window.location.href = response.session.url;
        } else {
          toast.error(
            response.message || "Failed to initialize Stripe checkout.",
          );
        }
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is empty
  const hasItems =
    cartState.data?.products && cartState.data.products.length > 0;

  if (!hasItems) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
            <IconShoppingCart stroke={1.5} className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-500">
            You don&apos;t have any items in your shopping cart to checkout.
            Explore our collection and add your favorite items!
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700"
            >
              Start Shopping
            </Link>
            <Link
              href="/cart"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              <IconArrowLeft className="h-4 w-4" />
              View Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 py-10 min-h-[calc(100vh-200px)]">
      <div className="container">
        {/* Breadcrumb / Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Link
              href="/cart"
              className="hover:text-primary-600 transition-colors flex items-center gap-1"
            >
              <IconArrowLeft className="h-3.5 w-3.5" />
              Back to Cart
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-800">Checkout</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Complete Your Order
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Please enter your shipping address and select a payment method.
              </p>
            </div>

            {/* Stepper Pill */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium shadow-2xs">
              <span className="flex items-center gap-1 text-primary-600 font-semibold">
                <IconCircleCheckFilled className="h-4 w-4" />
                Cart
              </span>
              <span className="text-gray-300">➔</span>
              <span className="flex items-center gap-1 text-primary-600 font-bold">
                <span className="flex size-4 items-center justify-center rounded-full bg-primary-600 text-white text-[10px]">
                  2
                </span>
                Checkout
              </span>
              <span className="text-gray-300">➔</span>
              <span className="text-gray-400">Order Placed</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Checkout Grid */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left 2 Cols: Shipping Details & Payment Selector */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <ShippingAddressForm register={register} errors={errors} />
              </div>

              {/* Payment Method Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <PaymentMethodSelector
                  selectedMethod={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                />
              </div>

              {/* Guarantees Box */}
              <div className="rounded-2xl border border-primary-100 bg-primary-50/40 p-4 text-xs text-primary-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                    <IconShieldLock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">
                      Protected & Verified Transaction
                    </span>
                    <span className="text-primary-700/80">
                      Your information is encrypted with bank-grade security.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto text-primary-700 font-medium">
                  <IconTruckDelivery className="h-4 w-4" />
                  <span>Fast Doorstep Delivery</span>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Sticky Order Summary & Submit Button */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <CheckoutSummary
                  products={cartState.data.products}
                  totalCartPrice={cartState.data.totalCartPrice}
                  paymentMethod={selectedPaymentMethod}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
