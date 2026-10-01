"use server";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CartApiResponse } from "../types/cart.types";

export async function getCartItems(): Promise<CartApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "please login first",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v2/cart",
      method: "GET",
      headers: {
        token: token?.value,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "Something went wrong",
    };
  }
}

export async function addProductToCart(id: string): Promise<CartApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "please login first",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v2/cart",
      method: "POST",
      headers: {
        token: token?.value,
      },
      data: {
        productId: id,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "Something went wrong",
    };
  }
}

export async function updateProductQuantity(
  id: string,
  count: number,
): Promise<CartApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "please login first",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
      method: "PUT",
      headers: {
        token: token?.value,
      },
      data: {
        count,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "Something went wrong",
    };
  }
}

export async function removeProductToCart(
  id: string,
): Promise<CartApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "please login first",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
      method: "DELETE",
      headers: {
        token: token?.value,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "Something went wrong",
    };
  }
}

export async function clearCart(): Promise<CartApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "please login first",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v2/cart`,
      method: "DELETE",
      headers: {
        token: token?.value,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    return {
      status: "fail",
      message: "Something went wrong",
    };
  }
}
