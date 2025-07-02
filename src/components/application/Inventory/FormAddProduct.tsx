import LoaderIcon from "@/components/Icons/LoaderIcon";
import FormControl from "@/components/shared/FormControl";
import {
  addProductFormFieldsControls,
  addProductInitialState,
  AddProductSchemaType,
} from "@/schemas/addProductSchema";
import { createProduct, ProductBody } from "@/utils/api/products/addProduct";
import { toast } from "sonner";
import { uploadImage } from "@/utils/cloudinary/uploadImage";
import { Button, Toast } from "housy-lib";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import DropZone from "@/components/shared/DropZone";
import {
  CreateProductImage,
  createProductImage,
} from "@/utils/api/productImages/createProductImage";

interface Props {
  onClose: () => void;
  refetch: () => void;
}

const FormAddProduct = ({ onClose, refetch }: Props) => {
  const t = useTranslations("Inventory");
  const [loading, setLoading] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
    trigger,
    setValue,
    reset,
    watch,
  } = useFormContext<AddProductSchemaType>();
  const images = watch("images");

  const errorHandler = () => {
    console.log({ errors });
  };

  const addProductHandler = async (data: AddProductSchemaType) => {
    try {
      setLoading(true);
      const { images, ...other } = data;
      const r = toast.custom(() => (
        <Toast text="Creating product" type="loading" />
      ));
      const body: ProductBody = {
        ...other,
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
        };
        await createProductImage(body);
        refetch();
      }
      toast.dismiss(r);
      toast.custom(() => (
        <Toast text="Product created successfully" type="success" />
      ));
    } catch (err) {
      console.log({ err });
    } finally {
      reset(addProductInitialState);
      setLoading(false);
    }
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
        {addProductFormFieldsControls.map((field, index) => {
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
        <DropZone
          className="col-span-2"
          images={images}
          trigger={trigger}
          setValue={setValue}
          error={errors["images"]?.message ? t(errors["images"].message) : ""}
        />
        <Button
          disabled={loading}
          variant="filled"
          type="submit"
          className="w-full"
        >
          {loading && (
            <LoaderIcon className="animate-spin text-text-3 w-5 h-5 stroke-current" />
          )}
          {t("form.button.add")}
        </Button>
        <Button
          variant="ghost"
          type="button"
          className="w-full hover:bg-bg-2"
          onClick={() => {
            reset(addProductInitialState);
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
