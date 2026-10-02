import z from "zod";

export const checkoutSchema = z.object({
  details: z
    .string()
    .min(1, { message: "Address details are required" })
    .min(5, { message: "Address details should be at least 5 characters" }),

  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^01[0125][0-9]{8}$/, {
      message:
        "Please enter a valid Egyptian mobile number (e.g. 01012345678, 011..., 012..., 015...)",
    }),

  city: z
    .string()
    .min(1, { message: "City is required" })
    .min(2, { message: "City name must be at least 2 characters" }),

  postalCode: z.string().optional(),

  paymentMethod: z.enum(["cash", "card"]),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
