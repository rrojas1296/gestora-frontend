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
import { createProductImage } from "@/utils/api/productImages/createProductImage";
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
import Loader from "@/components/shared/Loader";
import useProduct from "@/hooks/useProduct";
import SelectForm from "@/components/shared/SelectForm";
import { deleteProductImage } from "@/utils/api/productImages/deleteProductImage";
import UpsertProductImages from "@/components/application/Inventory/UpsertProductImages";
import { destroyCloudinaryImage } from "@/utils/cloudinary/destroyCloudinaryImage";

export interface ExistimgImages {
  primary: ProductImage[];
  secondary: ProductImage[];
}

export interface NewImages {
  primary: File[];
  secondary: File[];
}

const FormAddProduct = () => {
  const t = useTranslations("Inventory");
  const [loading, setLoading] = useState(false);
  const [existingImages, setExistingImages] = useState<ExistimgImages>({
    primary: [],
    secondary: [],
  });
  const [newImages, setNewImages] = useState<NewImages>({
    primary: [],
    secondary: [],
  });
  const [imagesToDelete, setImagesToDelete] = useState<ProductImage[]>([]);
  const companyId = useAppSelector((state) => state.company.id);
  const params = useParams();
  const productId = z.uuidv4().safeParse(params.id).success
    ? (params.id as string)
    : undefined;
  const { categories, isLoading: loadingCategories } = useCategories(companyId);
  const { product, isLoading: loadingProduct, refetch } = useProduct(productId);
  const loadingData = loadingCategories || loadingProduct || !companyId;
  const router = useRouter();
  const {
    formState: { errors, isDirty },
    handleSubmit,
    control,
    register,
    trigger,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const errorHandler = () => {
    console.log({ errors });
  };

  const addProductHandler: SubmitHandler<SchemaType> = async (data) => {
    const r = toast.custom(
      () => (
        <Toast
          text={
            productId
              ? t("form.responses.updating")
              : t("form.responses.creating")
          }
          type="loading"
        />
      ),
      { duration: 1000 * 100 },
    );
    for (const image of imagesToDelete) {
      await deleteProductImage(image.id);
      if (image.public_id) await destroyCloudinaryImage(image.public_id);
    }
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

      for (const image of newImages.primary) {
        const { public_id, secure_url } = await uploadImage(image);
        await createProductImage({
          product_id: productId || newProductId || "",
          url: secure_url,
          name: image.name,
          is_primary: true,
          is_deleted: false,
          public_id,
        });
      }
      for (const image of newImages.secondary) {
        const { secure_url, public_id } = await uploadImage(image);
        await createProductImage({
          product_id: productId || newProductId || "",
          url: secure_url,
          name: image.name,
          is_primary: false,
          is_deleted: false,
          public_id,
        });
      }
      toast.custom(() => (
        <Toast
          text={
            productId
              ? t("form.responses.successUpdate")
              : t("form.responses.successCreate")
          }
          type="success"
        />
      ));
      if (productId) refetch();
    } catch (err) {
      console.log({ err });
      toast.custom(() => (
        <Toast text={t("form.responses.server_error")} type="error" />
      ));
    } finally {
      router.push("/inventory");
      toast.dismiss(r);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Updating form to validate correct number of images
    const mainImageUrl = newImages.primary.map((image) =>
      URL.createObjectURL(image),
    );
    const secondaryImageUrl = newImages.secondary.map((image) =>
      URL.createObjectURL(image),
    );
    const ep = productId ? existingImages.primary.map((i) => i.url) : [];
    const es = productId ? existingImages.secondary.map((i) => i.url) : [];
    setValue("main_image", [...ep, ...mainImageUrl]);
    setValue("secondary_images", [...es, ...secondaryImageUrl]);
    if (isDirty) trigger("main_image");
  }, [newImages]);

  useEffect(() => {
    if (!companyId || !product || !categories) return;
    const category = categories.find((c) => c.id === product.category_id);
    reset({
      name: product.name,
      description: product.description,
      brand: product.brand,
      category_id: category?.id,
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
      main_image: product.images.filter((i) => i.is_primary).map((i) => i.url),
      secondary_images: product.images
        .filter((i) => !i.is_primary)
        .map((i) => i.url),
    });
    setExistingImages({
      primary: product?.images.filter((i) => i.is_primary),
      secondary: product?.images.filter((i) => !i.is_primary),
    });
  }, [loadingData]);

  if (loadingData)
    return (
      <CardApp className="h-[calc(100vh-148px)] static w-full">
        <Loader className="static w-full h-full" />
      </CardApp>
    );

  return (
    <CardApp className="pb-12 overflow-hidden">
      <form
        className="grid lg:grid-cols-12 gap-4 lg:gap-x-10"
        onSubmit={handleSubmit(addProductHandler, errorHandler)}
      >
        <div className="lg:justify-between lg:flex lg:col-span-12">
          <div className="flex items-center gap-4">
            <Button
              variant="icon"
              type="button"
              className="shrink-0"
              onClick={() => router.push("/inventory")}
            >
              <ArrowLeft className="w-6 h-6 text-text-1 stroke-current" />
            </Button>
            <h1 className="font-semibold shrink-0 text-2xl text-left w-full lg:w-full break-words">
              {t("form.head.title")}
            </h1>
          </div>
          <p className="block text-sm text-text-2">
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
                  })) || []
                : options?.map((opt) => ({ ...opt, label: t(opt.label) })) ||
                  [];
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
              />
            );
          })}
        </div>
        <UpsertProductImages
          setExistingImages={setExistingImages}
          setImagesToDelete={setImagesToDelete}
          setNewImages={setNewImages}
          productId={productId}
          errors={errors}
          newImages={newImages}
          existingImages={existingImages}
        />
        <Button
          disabled={loading}
          variant="filled"
          type="submit"
          className="w-full lg:col-span-8 lg:w-fit min-w-40 justify-self-end"
        >
          {loading && (
            <LoaderIcon className="animate-spin text-text-3 w-5 h-5 stroke-current" />
          )}
          {productId ? t("form.button.update") : t("form.button.submit")}
        </Button>
      </form>
    </CardApp>
  );
};

export default FormAddProduct;
