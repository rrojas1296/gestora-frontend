import { FormControlType } from "@/types/controls";
import { z } from "zod";

export const dbStatusOptions = [
  "active",
  "inactive",
  "discontinued",
  "draft",
  "archived",
  "out_of_stock",
] as const;

export const addProductSchema = z.object({
  name: z.string().min(1, {
    message: "form.name.errors.required",
  }),
  sales_price: z.string().min(1, {
    message: "form.salesPrice.errors.required",
  }),
  cost_price: z.string().min(1, {
    message: "form.costPrice.errors.required",
  }),
  description: z.string(),
  quantity: z.string().min(1, {
    message: "form.quantity.errors.required",
  }),
  category: z.string().min(1, {
    message: "form.category.errors.required",
  }),
  status: z.enum(dbStatusOptions, {
    errorMap: () => ({ message: "form.status.errors.required" }),
  }),
  images: z
    .array(z.instanceof(File))
    .min(1, {
      message: "form.images.errors.required",
    })
    .max(3, {
      message: "form.images.errors.maxImages",
    }),
});

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
export type AddProductSchemaFields = keyof AddProductSchemaType;

export const addProductFormFieldsControls: FormControlType<AddProductSchemaFields>[] =
  [
    {
      name: "name",
      label: "form.name.label",
      type: "text",
      placeholder: "form.name.placeholder",
      className: "col-span-2",
    },
    {
      name: "description",
      label: "form.description.label",
      type: "textarea",
      placeholder: "form.description.placeholder",
      className: "col-span-2",
    },
    {
      name: "cost_price",
      label: "form.costPrice.label",
      type: "number",
      placeholder: "form.costPrice.placeholder",
      className: "col-start-1 col-end-2",
    },
    {
      name: "sales_price",
      label: "form.salesPrice.label",
      type: "number",
      placeholder: "form.salesPrice.placeholder",
      className: "col-start-2 col-end-3",
    },
    {
      name: "quantity",
      label: "form.quantity.label",
      type: "number",
      placeholder: "form.quantity.placeholder",
      className: "col-start-1 col-end-3",
    },
    {
      name: "status",
      options: [
        {
          label: "form.status.options.active.label",
          value: "active",
        },
        {
          label: "form.status.options.inactive.label",
          value: "inactive",
        },
        {
          label: "form.status.options.discontinued.label",
          value: "discontinued",
        },
        {
          label: "form.status.options.draft.label",
          value: "draft",
        },
        {
          label: "form.status.options.archived.label",
          value: "archived",
        },
      ],
      label: "form.status.label",
      type: "select",
      placeholder: "form.status.placeholder",
      className: "col-start-1 col-end-3",
    },
    {
      name: "category",
      type: "select",
      label: "form.category.label",
      placeholder: "form.category.placeholder",
      className: "col-span-2",
      options: [],
    },
  ];
export const addProductInitialState: AddProductSchemaType = {
  name: "",
  sales_price: "",
  cost_price: "",
  description: "",
  quantity: "",
  status: "active",
  images: [],
  category: "",
};
