import { Control } from "@/types/controls";
import { z } from "zod";

export const statusOptions = [
  "active",
  "inactive",
  "discontinued",
  "draft",
  "archived",
  "out_of_stock",
] as const;

export const currencyOptions = ["USD", "EUR", "PEN"] as const;

const schema = z
  .object({
    name: z.string().min(1, {
      message: "form.name.errors.required",
    }),
    description: z.string(),
    brand: z.string().min(1, {
      message: "form.brand.errors.required",
    }),
    category: z
      .string({
        error: "form.category.errors.required",
      })
      .min(1, {
        error: "form.category.errors.required",
      }),
    status: z.enum(statusOptions, {
      error: () => ({ message: "form.status.errors.required" }),
    }),
    sku: z.string().min(1, {
      error: "form.sku.errors.required",
    }),
    cost_price: z.number({
      error: "form.cost_price.errors.required",
    }),
    sales_price: z.number({
      error: "form.sales_price.errors.required",
    }),

    currency: z.enum(currencyOptions, {
      error: () => ({ message: "form.currency.errors.required" }),
    }),
    quantity: z.number({
      error: "form.quantity.errors.required",
    }),
    min_stock: z.number({
      error: "form.min_stock.errors.required",
    }),
    weight: z.nan().or(z.number()).optional(),
    length: z.nan().or(z.number()).optional(),
    width: z.nan().or(z.number()).optional(),
    height: z.nan().or(z.number()).optional(),
    color: z.string().optional(),
    images: z
      .array(z.instanceof(File))
      .min(1, {
        message: "form.images.errors.required",
      })
      .max(3, {
        message: "form.images.errors.maxImages",
      }),
  })
  .check((ctx) => {
    if (Number(ctx.value.min_stock) > Number(ctx.value.quantity))
      ctx.issues.push({
        code: "custom",
        message: "form.min_stock.errors.min_stock_greater_than_quantity",
        path: ["min_stock"],
        input: ctx.value,
      });
  });

export type SchemaType = z.infer<typeof schema>;
export type SchemaFields = keyof SchemaType;

const information: Control<SchemaFields>[] = [
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
    name: "brand",
    label: "form.brand.label",
    type: "text",
    placeholder: "form.brand.placeholder",
    className: "col-span-1",
  },
  {
    name: "category",
    type: "select",
    label: "form.category.label",
    placeholder: "form.category.placeholder",
    className: "col-span-1",
  },
  {
    name: "status",
    type: "select",
    label: "form.status.label",
    placeholder: "form.status.placeholder",
    className: "col-span-1",
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
  },
  {
    name: "sku",
    label: "form.sku.label",
    placeholder: "form.sku.placeholder",
    type: "text",
  },
];

const pricing: Control<SchemaFields>[] = [
  {
    name: "cost_price",
    label: "form.cost_price.label",
    type: "number",
    placeholder: "form.cost_price.placeholder",
    className: "col-start-1 col-end-2",
  },
  {
    name: "sales_price",
    label: "form.sales_price.label",
    type: "number",
    placeholder: "form.sales_price.placeholder",
    className: "col-start-2 col-end-3",
  },
  {
    name: "currency",
    label: "form.currency.label",
    type: "select",
    placeholder: "form.currency.placeholder",
    className: "col-span-2",
    options: [
      {
        label: "form.currency.options.EUR.label",
        value: "EUR",
      },
      {
        label: "form.currency.options.USD.label",
        value: "USD",
      },
      {
        label: "form.currency.options.PEN.label",
        value: "PEN",
      },
    ],
  },
];

const inventory: Control<SchemaFields>[] = [
  {
    name: "quantity",
    label: "form.quantity.label",
    type: "number",
    placeholder: "form.quantity.placeholder",
    className: "col-span-1",
  },
  {
    name: "min_stock",
    label: "form.min_stock.label",
    type: "number",
    placeholder: "form.min_stock.placeholder",
    className: "col-span-1",
  },
];

const details: Control<SchemaFields>[] = [
  {
    name: "weight",
    label: "form.weight.label",
    placeholder: "form.weight.placeholder",
    type: "number",
  },
  {
    name: "length",
    label: "form.length.label",
    placeholder: "form.length.placeholder",
    type: "number",
  },
  {
    name: "width",
    label: "form.width.label",
    placeholder: "form.width.placeholder",
    type: "number",
  },
  {
    name: "height",
    label: "form.height.label",
    placeholder: "form.height.placeholder",
    type: "number",
  },
  {
    name: "color",
    label: "form.color.label",
    placeholder: "form.color.placeholder",
    className: "col-span-2",
    type: "text",
  },
];
const controls = {
  information,
  pricing,
  inventory,
  details,
};

const defaultValues: SchemaType = {
  name: "",
  description: "",
  brand: "",
  category: "",
  status: "active",
  sku: "",
  cost_price: NaN,
  sales_price: NaN,
  currency: "PEN",
  quantity: NaN,
  min_stock: NaN,
  images: [],
};

export { controls, schema, defaultValues };
