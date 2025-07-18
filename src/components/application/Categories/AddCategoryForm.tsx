import React, { useState } from "react";
import { controls, SchemaType } from "@/schemas/addCategorySchema";
import FormControl from "@/components/shared/FormControl";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Button, Toast } from "gestora-lib";
import DropZone from "@/components/shared/DropZone";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import { createCategory } from "@/utils/api/categories/createCategory";
import { uploadImage } from "@/utils/cloudinary/uploadImage";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";

interface Props {
  refetch: () => void;
  setOpen: (val: boolean) => void;
}

const AddCategoryForm = ({ refetch, setOpen }: Props) => {
  const [loadingForm, setLoadingForm] = useState(false);
  const companyId = useAppSelector((state) => state.company.id);
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
  const handleSubmitForm = async (data: SchemaType) => {
    try {
      setLoadingForm(true);
      const r = toast.custom(
        () => <Toast text="Creating category" type="loading" />,
        { duration: 1000 * 100 },
      );
      const secure_url = await uploadImage(image[0]);
      const body = {
        name: data.name,
        description: data.description,
        image_url: secure_url,
        is_active: true,
        company_id: companyId!,
      };
      await createCategory(body);
      toast.dismiss(r);
      toast.custom(() => (
        <Toast text="Category created successfully" type="success" />
      ));
      setLoadingForm(true);
      setOpen(false);
      refetch();
    } catch {
      console.log("error");
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(handleSubmitForm)}>
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
      <div className="flex gap-4">
        <Button
          className="w-full"
          type="button"
          onClick={() => setOpen(false)}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button className="w-full">
          {loadingForm && (
            <LoaderIcon className="animate-spin w-5 h-5 stroke-current text-text-3" />
          )}
          {t("form.button.create")}
        </Button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
