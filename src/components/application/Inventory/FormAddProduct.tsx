import DropContainer from "@/components/shared/DropContainer";
import FormControl from "@/components/shared/FormControl";
import {
  addProductSchema,
  AddProductSchemaFields,
  AddProductSchemaType,
} from "@/schemas/addProductSchema";
import { FormControlType } from "@/types/controls";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "housy-lib";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  onClose: () => void;
}

const controls: FormControlType<AddProductSchemaFields>[] = [
  {
    name: "name",
    label: "form.name.label",
    type: "text",
    placeholder: "form.name.placeholder",
    className: "col-span-2",
  },
  {
    name: "costPrice",
    label: "form.costPrice.label",
    type: "number",
    placeholder: "form.costPrice.placeholder",
    className: "col-start-1 col-end-2",
  },
  {
    name: "salesPrice",
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
        label: "form.status.options.out_of_stock.label",
        value: "out_of_stock",
      },
    ],
    label: "form.status.label",
    type: "select",
    placeholder: "form.status.placeholder",
    className: "col-start-1 col-end-3",
  },
];

const FormAddProduct = ({ onClose }: Props) => {
  const t = useTranslations("Inventory");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductSchema),
  });

  const errorHandler = () => {
    console.log({ errors });
  };

  const addProductHandler = (data: AddProductSchemaType) => {
    console.log({ data });
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-xl text-left lg:w-full">
        {t("form.title")}
      </h1>
      <form
        className="grid gap-5 grid-cols-2 mt-5 max-w-md "
        onSubmit={handleSubmit(addProductHandler, errorHandler)}
      >
        {controls.map((field, index) => {
          const { label, name, type, placeholder, className, options } = field;
          const error = errors[name] ? t(errors[name].message!) : "";
          const opts = options?.map((opt) => ({ ...opt, label: t(opt.label) }));
          return (
            <FormControl
              key={index}
              placeholder={t(placeholder)}
              label={t(label)}
              name={name}
              error={error}
              type={type}
              options={opts}
              register={register}
              className={className}
              control={control}
            />
          );
        })}
        <DropContainer className="col-span-2" />
        <Button variant="filled" type="submit" className="w-full">
          {t("form.button.add")}
        </Button>
        <Button
          variant="ghost"
          type="button"
          className="w-full hover:bg-bg-2"
          onClick={() => {
            reset({
              costPrice: "",
              salesPrice: "",
              name: "",
              quantity: "",
            });
            onClose();
          }}
        >
          {t("form.button.cancel")}
        </Button>
      </form>
    </div>
  );
};

export default FormAddProduct;
