import { companySectors } from "@/config/constants";
import { FormControlType } from "@/types/controls";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(1, {
      message: "company.form.name.errors.required",
    }),
    image: z.instanceof(File).or(z.string()).optional(),
    sector: z.enum(companySectors, {
      errorMap: () => ({ message: "company.form.sector.errors.required" }),
    }),
    otherSector: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.sector === "other" && !data.otherSector) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "company.form.otherSector.errors.required",
        path: ["otherSector"],
      });
    }
  });

export type SchemaType = z.infer<typeof schema>;
export type SchemaFields = keyof SchemaType;

const controls: FormControlType<SchemaFields>[] = [
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
