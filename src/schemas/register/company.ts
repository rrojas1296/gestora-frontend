import { companySectors } from "@/config/constants";
import { Control } from "@/types/controls";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(1, {
      message: "company.form.name.errors.required",
    }),
    image: z.instanceof(File).or(z.string()).optional(),
    sector: z.enum(companySectors, {
      error: () => ({ message: "company.form.sector.errors.required" }),
    }),
    otherSector: z.string().optional(),
  })
  .check((ctx) => {
    if (ctx.value.sector === "other" && !ctx.value.otherSector) {
      ctx.issues.push({
        code: "custom",
        message: "company.form.otherSector.errors.required",
        path: ["otherSector"],
        input: ctx.value,
      });
    }
  });

export type SchemaType = z.infer<typeof schema>;
export type SchemaFields = keyof SchemaType;

const controls: Control<SchemaFields>[] = [
  {
    name: "name",
    type: "text",
    label: "company.form.name.label",
    placeholder: "company.form.name.placeholder",
  },
  {
    name: "sector",
    type: "select",
    label: "company.form.sector.label",
    placeholder: "company.form.sector.placeholder",
    options: companySectors.map((value) => ({
      value,
      label: value,
    })),
  },
  {
    name: "otherSector",
    type: "text",
    label: "company.form.otherSector.label",
    placeholder: "company.form.otherSector.placeholder",
  },
];
export { controls, schema };
