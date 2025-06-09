import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "form.email.errors.required",
    })
    .email({
      message: "form.email.errors.invalid",
    }),
  password: z.string().min(1, {
    message: "form.password.errors.required",
  }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type LoginSchemaFields = keyof LoginSchemaType;
