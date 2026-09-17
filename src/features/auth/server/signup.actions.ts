"use server";

import { apiClient } from "@/services/apiClient";
import { isAxiosError } from "axios";
import z from "zod";
import { signupSchema, SignupType } from "../schemas/signup.schema";

type FieldErrors = Record<string, string[] | undefined>;

type SignupActionResponse = {
  success: boolean;
  message: string;
  fieldErrors?: FieldErrors;
};

export async function signupAction(
  values: SignupType,
): Promise<SignupActionResponse> {
  const validationResult = z.safeParse(signupSchema, values);

  if (!validationResult.success) {
    const { formErrors, fieldErrors } = z.flattenError(validationResult.error);

    return {
      success: false,
      message: formErrors[0] ?? "Please check the form fields and try again.",
      fieldErrors,
    };
  }

  try {
    await apiClient.post("/auth/signup", validationResult.data);

    return {
      success: true,
      message: "Account created successfully!",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const data = error.response?.data;

      return {
        success: false,
        message:
          typeof data?.message === "string"
            ? data.message
            : "Unable to create your account. Please try again.",
        fieldErrors:
          data?.errors && typeof data.errors === "object"
            ? data.errors
            : undefined,
      };
    }

    console.error("signupAction:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
