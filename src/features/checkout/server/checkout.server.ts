"use server";

import { verifyToken } from "@/features/auth/server/auth.actions";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { cookies } from "next/headers";
import {
  CashOrderResponse,
  GetOrdersResponse,
  OnlinePaymentResponse,
  ShippingAddress,
  UserOrder,
} from "../types/checkout.types";

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
): Promise<CashOrderResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    return {
      status: "fail",
      message: "Please log in first to complete your order.",
    };
  }

  if (!cartId) {
    return {
      status: "fail",
      message: "Active cart not found. Please add products to your cart first.",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
      method: "POST",
      headers: {
        token: token.value,
      },
      data: {
        shippingAddress,
      },
    };

    const { data } = await axios.request<CashOrderResponse>(options);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data;
      return {
        status: "fail",
        message:
          typeof errorData?.message === "string"
            ? errorData.message
            : "Failed to create cash order. Please try again.",
      };
    }

    return {
      status: "fail",
      message: "An unexpected error occurred while placing your order.",
    };
  }
}

export async function createOnlinePaymentSession(
  cartId: string,
  shippingAddress: ShippingAddress,
  originUrl?: string,
): Promise<OnlinePaymentResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    return {
      status: "fail",
      message: "Please log in first to complete your payment.",
    };
  }

  if (!cartId) {
    return {
      status: "fail",
      message: "Active cart not found. Please add products to your cart first.",
    };
  }

  const clientOrigin = originUrl || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(
        clientOrigin,
      )}`,
      method: "POST",
      headers: {
        token: token.value,
      },
      data: {
        shippingAddress,
      },
    };

    const { data } = await axios.request<OnlinePaymentResponse>(options);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data;
      return {
        status: "fail",
        message:
          typeof errorData?.message === "string"
            ? errorData.message
            : "Failed to initialize payment session. Please try again.",
      };
    }

    return {
      status: "fail",
      message: "An unexpected error occurred while initializing checkout.",
    };
  }
}

export async function getUserOrders(
  userId?: string,
): Promise<GetOrdersResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  let resolvedUserId = userId;

  if (!resolvedUserId) {
    const authState = await verifyToken();
    if (!authState.isAuthenticated || !authState.userInfo?.id) {
      return {
        status: "fail",
        message: "Please log in to view your orders.",
        data: [],
      };
    }
    resolvedUserId = authState.userInfo.id;
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${resolvedUserId}`,
      method: "GET",
      headers: token?.value
        ? {
            token: token.value,
          }
        : undefined,
    };

    const { data } = await axios.request<UserOrder[]>(options);

    return {
      status: "success",
      data: Array.isArray(data) ? data : [],
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data;
      return {
        status: "fail",
        message:
          typeof errorData?.message === "string"
            ? errorData.message
            : "Failed to fetch orders.",
        data: [],
      };
    }

    return {
      status: "fail",
      message: "An unexpected error occurred while fetching your orders.",
      data: [],
    };
  }
}
