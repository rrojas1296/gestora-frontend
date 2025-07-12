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
import { Button, Toast } from "gestora-lib";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import DropZone from "@/components/shared/DropZone";
import {
  CreateProductImage,
  createProductImage,
} from "@/utils/api/productImages/createProductImage";
import useCategories from "@/hooks/useCategories";
import { useAppSelector } from "@/store/hooks";
import { sleep } from "@/utils/sleep";

interface Props {
  onClose: () => void;
  refetch: () => void;
}

const FormAddProduct = ({ onClose, refetch }: Props) => {
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
      const { images, category: category_id, ...other } = data;
      const r = toast.custom(
        () => <Toast text="Creating product" type="loading" />,
        { duration: 1000 * 100 },
      );
      const body: ProductBody = {
        ...other,
        category_id,
        company_id: companyId!,
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
      refetch();
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
          const opts =
            name !== "category"
              ? options?.map((opt) => ({ ...opt, label: t(opt.label) }))
              : categories?.map((cat) => ({ label: cat.name, value: cat.id }));
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
