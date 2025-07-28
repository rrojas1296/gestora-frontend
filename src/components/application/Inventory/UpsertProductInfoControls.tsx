import FormControl from "@/components/shared/FormControl";
import SelectForm from "@/components/shared/SelectForm";
import { controls, SchemaType } from "@/schemas/addProductSchema";
import { CategoryDB } from "@/utils/api/categories/getCategoriesPerCompany";
import { useTranslations } from "next-intl";
import React from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  errors: FieldErrors<SchemaType>;
  categories?: CategoryDB[];
  control: Control<SchemaType>;
  register: UseFormRegister<SchemaType>;
}

const UpsertProductInfoControls = ({
  errors,
  categories,
  control,
  register,
}: Props) => {
  const t = useTranslations("Inventory");
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:col-span-8">
      <div className="grid gap-2">
        <h1 className="text-xl font-normal text-text-1">
          {t("form.sections.information.title")}
        </h1>
        <p className="text-text-2 text-sm">
          {t("form.sections.information.description")}
        </p>
      </div>
      {controls.information.map((field, index) => {
        const { label, name, type, placeholder, className, options } = field;
        const error =
          errors[name] && errors[name].message
            ? t(errors[name].message)
            : undefined;

        const opts =
          name === "category_id"
            ? categories?.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })) || []
            : options?.map((opt) => ({ ...opt, label: t(opt.label) })) || [];
        return type === "select" ? (
          <SelectForm
            key={index}
            control={control}
            name={name}
            placeholder={t(placeholder)}
            options={opts}
            label={t(label)}
            error={error}
          />
        ) : (
          <FormControl
            key={index}
            placeholder={t(placeholder)}
            label={t(label)}
            control={control}
            name={name}
            type={type}
            className={className}
            error={error}
            register={register}
          />
        );
      })}
      <div className="lg:col-span-2 grid gap-2">
        <h1 className="text-xl font-normal text-text-1">
          {t("form.sections.pricing.title")}
        </h1>
        <p className="text-text-2 text-sm">
          {t("form.sections.pricing.description")}
        </p>
      </div>
      {controls.pricing.map((field, index) => {
        const { label, name, type, placeholder, className, options } = field;
        const error =
          errors[name] && errors[name].message ? t(errors[name].message) : "";
        const opts =
          options?.map((opt) => ({
            ...opt,
            label: t(opt.label),
          })) || [];
        return type === "select" ? (
          <SelectForm
            key={index}
            control={control}
            name={name}
            placeholder={t(placeholder)}
            options={opts}
            label={t(label)}
            error={error}
          />
        ) : (
          <FormControl
            key={index}
            placeholder={t(placeholder)}
            label={t(label)}
            name={name}
            error={error}
            type={type}
            register={register}
            className={className}
          />
        );
      })}
      <div className="lg:col-span-2 grid gap-2">
        <h1 className="text-xl font-normal text-text-1">
          {t("form.sections.inventory.title")}
        </h1>
        <p className="text-text-2 text-sm">
          {t("form.sections.inventory.description")}
        </p>
      </div>
      {controls.inventory.map((field, index) => {
        const { label, name, type, placeholder, className } = field;
        const error =
          errors[name] && errors[name].message ? t(errors[name].message) : "";
        return (
          <FormControl
            key={index}
            placeholder={t(placeholder)}
            label={t(label)}
            name={name}
            error={error}
            type={type}
            register={register}
            className={className}
          />
        );
      })}
      <div className="lg:col-span-2 grid gap-2">
        <h1 className="text-xl font-normal text-text-1">
          {t("form.sections.details.title")}
        </h1>
        <p className="text-text-2 text-sm">
          {t("form.sections.details.description")}
        </p>
      </div>
      {controls.details.map((field, index) => {
        const { label, name, type, placeholder, className } = field;
        const error =
          errors[name] && errors[name].message ? t(errors[name].message) : "";
        return (
          <FormControl
            key={index}
            placeholder={t(placeholder)}
            label={t(label)}
            name={name}
            error={error}
            type={type}
            register={register}
            className={className}
          />
        );
      })}
    </div>
  );
};

export default UpsertProductInfoControls;
