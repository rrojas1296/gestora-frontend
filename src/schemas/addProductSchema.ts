import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(1, {
    message: "form.name.errors.required",
  }),
  salesPrice: z.string().min(1, {
    message: "form.salesPrice.errors.required",
  }),
  costPrice: z.string().min(1, {
    message: "form.costPrice.errors.required",
  }),
  quantity: z.string().min(1, {
    message: "form.quantity.errors.required",
  }),
  status: z.string().min(1, {
    message: "form.status.errors.required",
  }),
});

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
export type AddProductSchemaFields = keyof AddProductSchemaType;
