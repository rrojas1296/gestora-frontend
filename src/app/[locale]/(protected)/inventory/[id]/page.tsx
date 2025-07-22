"use client";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import FormControl from "@/components/shared/FormControl";
import { createProduct } from "@/utils/api/products/addProduct";
import { toast } from "sonner";
import { uploadImage } from "@/utils/cloudinary/uploadImage";
import { Button, Toast } from "gestora-lib";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import ArrowLeft from "@/components/Icons/CloseIcon";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { ProductImage } from "@/types/api/inventory";
import { updateProduct } from "@/utils/api/products/updateProduct";
import z from "zod";
import PreviewImage from "@/components/shared/PreviewImage";
import Loader from "@/components/shared/Loader";
import useProduct from "@/hooks/useProduct";
import SelectForm from "@/components/shared/SelectForm";

const FormAddProduct = () => {
  const t = useTranslations("Inventory");
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [mainImage, setMainImage] = useState<File[]>([]);
  const [secondaryImages, setSecondaryImages] = useState<File[]>([]);
  const companyId = useAppSelector((state) => state.company.id);
  const params = useParams();
  const productId = z.uuidv4().safeParse(params.id).success
    ? (params.id as string)
    : undefined;
  console.log({ companyId });
  const { categories, isLoading: loadingCategories } = useCategories(companyId);
  const { product, isLoading: loadingProduct } = useProduct(productId);
  const loadingData = loadingCategories || loadingProduct || !companyId;
  const router = useRouter();
  const {
    formState: { errors, isDirty },
    handleSubmit,
    control,
    register,
    trigger,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const form = watch();

  const errorHandler = () => {
    console.log({ errors });
  };

  const addProductHandler: SubmitHandler<SchemaType> = async (data) => {
    const r = toast.custom(
      () => <Toast text={t("form.responses.loading")} type="loading" />,
      { duration: 1000 * 100 },
    );
    setLoading(true);
    try {
      const body = {
        ...data,
        company_id: companyId,
      };
      delete body.main_image;
      delete body.secondary_images;
      let newProductId;
      if (productId) {
        await updateProduct(body, productId);
      } else {
        const { id } = await createProduct(body);
        newProductId = id;
      }

      for (const image of mainImage) {
        const secure_url = await uploadImage(image);
        const body: CreateProductImage = {
          product_id: productId || newProductId || "",
          url: secure_url,
          is_primary: true,
          is_deleted: false,
        };
        await createProductImage(body);
      }
      for (const image of secondaryImages) {
        const secure_url = await uploadImage(image);
        const body: CreateProductImage = {
          product_id: productId || newProductId || "",
          url: secure_url,
          is_primary: false,
          is_deleted: false,
        };
        await createProductImage(body);
      }
      toast.custom(() => (
        <Toast text={t("form.responses.success")} type="success" />
      ));
    } catch (err) {
      console.log({ err });
      toast.custom(() => (
        <Toast text={t("form.responses.server_error")} type="error" />
      ));
    } finally {
      toast.dismiss(r);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const mainImageUrl = mainImage.map((image) => URL.createObjectURL(image));
  //   const secondaryImageUrl = secondaryImages.map((image) =>
  //     URL.createObjectURL(image),
  //   );
  //   setValue("main_image", [...mainImageUrl]);
  //   setValue("secondary_images", [...secondaryImageUrl]);
  //   if (isDirty) trigger("main_image");
  // }, [mainImage, secondaryImages]);

  useEffect(() => {
    console.log("Getting existing product");
    if (!companyId || !product || !categories) return;
    reset({
      name: product.name,
      description: product.description,
      brand: product.brand,
      category_id: product.category_id,
      status: product.status,
      sku: product.sku,
      cost_price: product.cost_price,
      sales_price: product.sales_price,
      currency: product.currency,
      quantity: product.quantity,
      min_stock: product.min_stock,
      color: product.color,
      weight: product.weight,
      width: product.width,
      height: product.height,
      length: product.length,
    });
    setExistingImages(product?.images || []);
  }, [loadingData]);
  console.log({
    loadingData,
    product,
    categories,
    form,
  });
  if (loadingData)
    return <Loader className="h-[calc(100vh-148px)] static w-full" />;
  return (
    <CardApp className="pb-12 overflow-hidden">
      <form
        className="grid lg:grid-cols-12 gap-4 lg:gap-x-10"
        onSubmit={handleSubmit(addProductHandler, errorHandler)}
      >
        <div className="lg:justify-between lg:col-span-12">
          <div className="flex items-center gap-4">
            <Button
              variant="icon"
              type="button"
              className="shrink-0"
              onClick={() => router.push("/inventory")}
            >
              <ArrowLeft className="w-6 h-6 text-text-1 stroke-current" />
            </Button>
            <h1 className="font-semibold shrink-0 text-2xl text-left lg:w-full">
              {t("form.head.title")}
            </h1>
          </div>
          <p className="hidden lg:block text-sm text-text-2">
            {t("form.head.description")}
          </p>
        </div>
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
            const { label, name, type, placeholder, className, options } =
              field;
            const error =
              errors[name] && errors[name].message
                ? t(errors[name].message)
                : undefined;
            const opts =
              name === "category_id"
                ? categories?.map((cat) => ({
                    label: cat.name,
                    value: cat.id,
                  }))
                : options?.map((opt) => ({ ...opt, label: t(opt.label) }));
            return type === "select" ? (
              <SelectForm
                key={index}
                control={control}
                value={form[name] as string}
                onChange={(val) => setValue(name, val)}
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
            const { label, name, type, placeholder, className, options } =
              field;
            const error =
              errors[name] && errors[name].message
                ? t(errors[name].message)
                : "";
            const opts = options?.map((opt) => ({
              ...opt,
              label: t(opt.label),
            }));
            return type === "select" ? (
              <SelectForm
                key={index}
                control={control}
                value={watch(name) as string}
                onChange={(val) => setValue(name, val)}
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
              errors[name] && errors[name].message
                ? t(errors[name].message)
                : "";
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
                control={control}
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
            const { label, name, type, placeholder, className, options } =
              field;
            const error =
              errors[name] && errors[name].message
                ? t(errors[name].message)
                : "";
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
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="lg:col-span-2 grid gap-2">
            <h1 className="text-xl font-normal text-text-1">
              {t("form.sections.images.title")}
            </h1>
            <p className="text-text-2 text-sm">
              {t("form.sections.images.description")}
            </p>
          </div>
          <h3 className="text-text-1 text-sm">
            {t("form.sections.images.main_image.title")}
          </h3>
          <DropZone
            placeholder={t("form.sections.images.main_image.placeholder")}
            buttonText={t("form.sections.images.main_image.button")}
            images={mainImage}
            setImages={setMainImage}
            limit={1}
            className={mainImage.length >= 1 ? "hidden" : ""}
          />
          <PreviewImage
            files={mainImage}
            className={mainImage.length > 0 ? "" : "hidden"}
            onDelete={(index) => {
              setMainImage((prev) => prev.filter((_, i) => i !== index));
            }}
          />
          {errors["main_image"] && (
            <span className="text-danger text-sm">
              {t(errors["main_image"].message!)}
            </span>
          )}
          <h3 className="text-text-1 text-sm">
            {t("form.sections.images.secondary_images.title")}
          </h3>
          <DropZone
            placeholder={t("form.sections.images.secondary_images.placeholder")}
            buttonText={t("form.sections.images.secondary_images.button")}
            images={secondaryImages}
            setImages={setSecondaryImages}
            limit={3}
            className={secondaryImages.length >= 3 ? "hidden" : ""}
          />
          <PreviewImage
            files={secondaryImages}
            className={secondaryImages.length > 0 ? "" : "hidden"}
            onDelete={(index) => {
              setSecondaryImages((prev) => prev.filter((_, i) => i !== index));
            }}
          />
          <PreviewImage
            images={existingImages}
            onDelete={(index) => {
              setSecondaryImages((prev) => prev.filter((_, i) => i !== index));
            }}
          />
        </div>
        <Button
          disabled={loading}
          variant="filled"
          type="submit"
          className="w-full lg:col-span-8 lg:w-fit min-w-40 justify-self-end"
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
