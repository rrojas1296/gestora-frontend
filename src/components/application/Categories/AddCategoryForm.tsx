import React, { useState } from "react";
import { controls, SchemaType } from "@/schemas/addCategorySchema";
import FormControl from "@/components/shared/FormControl";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button } from "gestora-lib";
import DropZone from "@/components/shared/DropZone";

const AddCategoryForm = () => {
  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<SchemaType>();
  const t = useTranslations("Category");
  const image = watch("image");
  const createCategory = (data: SchemaType) => {
    console.log({ data });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(createCategory)}>
      <h1 className="font-bold text-xl text-left lg:w-full">
        {t("form.title")}
      </h1>
      {controls.map((c, index) => {
        const { name, type, label, placeholder, className } = c;
        const error = errors[name] ? t(errors[name].message!) : "";
        return (
          <FormControl
            key={index}
            name={name}
            type={type}
            label={t(label)}
            className={className}
            placeholder={t(placeholder)}
            register={register}
            control={control}
            error={error}
          />
        );
      })}
      <DropZone
        images={image}
        name="image"
        trigger={trigger}
        buttonText={t("form.image.button")}
        placeholder={t("form.image.placeholder")}
        setValue={setValue}
        error={errors["image"]?.message ? t(errors["image"].message) : ""}
      />
      <Button className="w-full">{t("form.button.add")}</Button>
    </form>
  );
};

export default AddCategoryForm;
