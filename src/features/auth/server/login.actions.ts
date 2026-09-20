"use server";

import { apiClient } from "@/services/apiClient";
import { isAxiosError } from "axios";
import z from "zod";
import { loginSchema, loginType } from "../schemas/login.schema";

type FieldErrors = Partial<Record<keyof loginType, string[] | undefined>>;

type User = {
  id?: string;
  name: string;
  email: string;
  role: string;
};

type LoginActionResponse = {
  success: boolean;
  message: string;
  fieldErrors?: FieldErrors;
  user?: User;
  token?: string;
};

export async function loginAction(
  values: loginType,
): Promise<LoginActionResponse> {
  const validationResult = z.safeParse(loginSchema, values);

  if (!validationResult.success) {
    const { formErrors, fieldErrors } = z.flattenError(validationResult.error);

    return {
      success: false,
      message: formErrors[0] ?? "Please check the form fields and try again.",
      fieldErrors,
    };
  }

  try {
    const { data } = await apiClient.post(
      "/auth/signin",
      validationResult.data,
    );

    return {
      success: true,
      message: "User logged in successfully!",
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const data = error.response?.data;

      return {
        success: false,
        message:
          typeof data?.message === "string"
            ? data.message
            : "Unable to login. Please try again.",
        fieldErrors:
          data?.errors && typeof data.errors === "object"
            ? data.errors
            : undefined,
      };
    }

    console.error("loginAction:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
