import z from "zod";

export const signupSchema = z
  .object({
    name: z.string().trim().nonempty({ error: "name is required" }).min(2, {
      error: "Name must be at least 2 characters",
    }),

    email: z
      .email({
        error: "Please enter a valid email address",
      })
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, {
        error: "Password must be at least 8 characters",
      })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        error: "Password must contain at least one number",
      })
      .regex(/[!@#$&*_]/, {
        error:
          "Password must contain at least one special character (!, @, #, $, &, *, _)",
      }),

    rePassword: z.string().min(1, {
      error: "Please confirm your password",
    }),

    phone: z.string().regex(/^01[0125]\d{8}$/, {
      error: "Please enter a valid Egyptian phone number",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "Passwords do not match",
  });

export type SignupType = z.infer<typeof signupSchema>;
