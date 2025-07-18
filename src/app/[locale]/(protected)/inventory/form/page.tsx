"use client";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import FormControl from "@/components/shared/FormControl";
import { createProduct, ProductBody } from "@/utils/api/products/addProduct";
import { toast } from "sonner";
import { uploadImage } from "@/utils/cloudinary/uploadImage";
import { Button, Toast } from "gestora-lib";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DropZone from "@/components/shared/DropZone";
import {
  CreateProductImage,
  createProductImage,
} from "@/utils/api/productImages/createProductImage";
import useCategories from "@/hooks/useCategories";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import CardApp from "@/components/shared/CardApp";
import {
  controls,
  schema,
  defaultValues,
  SchemaType,
} from "@/schemas/addProductSchema";
import { convertToNumber } from "@/utils/lib/convertToNumber";

const FormAddProduct = () => {
  const t = useTranslations("Inventory");
  const [loading, setLoading] = useState(false);
  const companyId = useAppSelector((state) => state.company.id);
  const { categories } = useCategories(companyId);
  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
    trigger,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const images = watch("images");
  const form = watch();
  console.log({ form });

  const errorHandler = () => {
    console.log({ errors });
  };

  const addProductHandler = async (data: SchemaType) => {
    try {
      const t = {
        name: "Diego",
        age: 20,
        is_active: true,
        DNI: "70550605",
      };
      console.log({ data: convertToNumber(t) });
      setLoading(true);
      const { images, category: category_id, ...other } = data;
      const r = toast.custom(
        () => <Toast text="Creating product" type="loading" />,
        { duration: 1000 * 100 },
      );
      const body: ProductBody = {
        ...other,
        category_id,
        company_id: companyId!,
        min_stock: Number(data.min_stock),
        cost_price: Number(data.cost_price),
        sales_price: Number(data.sales_price),
        quantity: Number(data.quantity),
      };
      const { id } = await createProduct(body);

      for (const image of images) {
        const secure_url = await uploadImage(image);
        const body: CreateProductImage = {
          product_id: id,
          url: secure_url,
          is_primary: images.indexOf(image) === 0,
          is_deleted: false,
        };
        await createProductImage(body);
      }
      toast.dismiss(r);
      toast.custom(() => (
        <Toast text="Product created successfully" type="success" />
      ));
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };
  return (
    <CardApp className="pb-12">
      <form
        className="grid grid-cols-12 gap-y-6 gap-x-12"
        onSubmit={handleSubmit(addProductHandler, errorHandler)}
      >
        <div className="flex justify-between col-span-12">
          <h1 className="font-semibold text-2xl text-left lg:w-full">
            {t("form.head.title")}
          </h1>
          <p className="text-sm text-text-2 shrink-0">
            {t("form.head.description")}
          </p>
        </div>
        <div className="grid gap-6 grid-cols-2 col-span-8">
          <div className="grid gap-2">
            <h1 className="text-xl font-normal text-text-1">
              {t("form.sections.information.title")}
            </h1>
            <p className="text-text-2 text-sm">
              {t("form.sections.information.description")}
            </p>
          </div>
          {controls.information.map((field, index) => {
            const { label, name, type, placeholder, className, options } =
              field;
            const error = errors[name] ? t(errors[name].message!) : "";
            const opts =
              name !== "category"
                ? options?.map((opt) => ({ ...opt, label: t(opt.label) }))
                : categories?.map((cat) => ({
                    label: cat.name,
                    value: cat.id,
                  }));
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
          <div className="col-span-2 grid gap-2">
            <h1 className="text-xl font-normal text-text-1">
              {t("form.sections.pricing.title")}
            </h1>
            <p className="text-text-2 text-sm">
              {t("form.sections.pricing.description")}
            </p>
          </div>
          {controls.pricing.map((field, index) => {
            const { label, name, type, placeholder, className, options } =
              field;
            const error = errors[name] ? t(errors[name].message!) : "";
            const opts = options?.map((opt) => ({
              ...opt,
              label: t(opt.label),
            }));
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
          <div className="col-span-2 grid gap-2">
            <h1 className="text-xl font-normal text-text-1">
              {t("form.sections.inventory.title")}
            </h1>
            <p className="text-text-2 text-sm">
              {t("form.sections.inventory.description")}
            </p>
          </div>
          {controls.inventory.map((field, index) => {
            const { label, name, type, placeholder, className, options } =
              field;
            const error = errors[name] ? t(errors[name].message!) : "";
            const opts =
              name !== "category"
                ? options?.map((opt) => ({ ...opt, label: t(opt.label) }))
                : categories?.map((cat) => ({
                    label: cat.name,
                    value: cat.id,
                  }));
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
          <div className="col-span-2 grid gap-2">
            <h1 className="text-xl font-normal text-text-1">
              {t("form.sections.details.title")}
            </h1>
            <p className="text-text-2 text-sm">
              {t("form.sections.details.description")}
            </p>
          </div>
          {controls.details.map((field, index) => {
            const { label, name, type, placeholder, className, options } =
              field;
            const error = errors[name] ? t(errors[name].message!) : "";
            const opts =
              name !== "category"
                ? options?.map((opt) => ({ ...opt, label: t(opt.label) }))
                : categories?.map((cat) => ({
                    label: cat.name,
                    value: cat.id,
                  }));
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
        </div>
        <div className="col-span-4 flex flex-col gap-6">
          <div className="col-span-2 grid gap-2">
            <h1 className="text-xl font-normal text-text-1">
              {t("form.sections.images.title")}
            </h1>
            <p className="text-text-2 text-sm">
              {t("form.sections.images.description")}
            </p>
          </div>
          <DropZone
            name="images"
            images={images}
            placeholder={t("form.images.placeholder")}
            buttonText={t("form.images.buttonText")}
            trigger={trigger}
            limit={3}
            setValue={setValue}
            zoneClassName="h-[300px]"
            error={errors["images"]?.message ? t(errors["images"].message) : ""}
          />
        </div>
        <Button
          disabled={loading}
          variant="filled"
          type="submit"
          className="col-span-8 w-40 justify-self-end"
        >
          {loading && (
            <LoaderIcon className="animate-spin text-text-3 w-5 h-5 stroke-current" />
          )}
          {t("form.button.submit")}
        </Button>
      </form>
    </CardApp>
  );
};

export default FormAddProduct;
