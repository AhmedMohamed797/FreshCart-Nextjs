import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { error: "email is required" })
    .pipe(z.email({ error: "invalid email. Please use another one" })),

  password: z
    .string()
    .nonempty({ error: "password is required" })
    .min(8, { error: "password must be at least 8 chars" }),
});

export type loginType = z.infer<typeof loginSchema>;
