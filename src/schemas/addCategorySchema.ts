import { FormControlType } from "@/types/controls";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, {
    message: "form.name.errors.required",
  }),
  description: z.string().min(1, {
    message: "form.description.errors.required",
  }),
  image: z
    .array(z.instanceof(File))
    .min(1, {
      message: "form.image.errors.required",
    })
    .max(1, {
      message: "form.image.errors.max",
    }),
});

export type SchemaType = z.infer<typeof schema>;
export type SchemaFields = keyof SchemaType;

const controls: FormControlType<SchemaFields>[] = [
  {
    name: "name",
    type: "text",
    label: "form.name.label",
    placeholder: "form.name.placeholder",
  },
  {
    name: "description",
    type: "text",
    label: "form.description.label",
    placeholder: "form.description.placeholder",
  },
];

const initialValues: SchemaType = {
  name: "",
  description: "",
  image: [],
};

export { schema, controls, initialValues };
