import {
  ExistimgImages,
  NewImages,
} from "@/app/[locale]/(protected)/inventory/[id]/page";
import DropZone from "@/components/shared/DropZone";
import PreviewImage from "@/components/shared/PreviewImage";
import { SchemaType } from "@/schemas/addProductSchema";
import { ProductImage } from "@/types/api/inventory";
import { useTranslations } from "next-intl";
import React, { Dispatch } from "react";
import { FieldErrors } from "react-hook-form";

interface Props {
  newImages: NewImages;
  existingImages: ExistimgImages;
  setImagesToDelete: Dispatch<React.SetStateAction<ProductImage[]>>;
  setExistingImages: Dispatch<React.SetStateAction<ExistimgImages>>;
  setNewImages: Dispatch<React.SetStateAction<NewImages>>;
  productId?: string;
  errors: FieldErrors<SchemaType>;
}

const UpsertProductImages = ({
  setNewImages,
  setImagesToDelete,
  setExistingImages,
  newImages,
  existingImages,
  productId,
  errors,
}: Props) => {
  const t = useTranslations("Inventory");
  return (
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
        setImages={(val) =>
          setNewImages((prev) => ({
            ...prev,
            primary: [...prev.primary, ...val],
          }))
        }
        show={
          productId
            ? existingImages.primary.length + newImages.primary.length < 1
            : newImages.primary.length < 1
        }
        className={newImages.primary.length >= 1 ? "hidden" : ""}
      />
      <PreviewImage
        files={newImages.primary}
        className={newImages.primary.length > 0 ? "" : "hidden"}
        onDelete={(index) => {
          setNewImages((prev) => ({
            ...prev,
            primary: prev.primary.filter((_, i) => i !== index),
          }));
        }}
      />
      <PreviewImage
        images={existingImages.primary}
        onDelete={(index) => {
          setImagesToDelete((prev) => [...prev, existingImages.primary[index]]);
          setExistingImages((prev) => ({
            ...prev,
            primary: prev.primary.filter((_, i) => i !== index),
          }));
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
        setImages={(images) => {
          setNewImages((prev) => ({
            ...prev,
            secondary: [...prev.secondary, ...images],
          }));
        }}
        show={
          productId
            ? existingImages.secondary.length + newImages.secondary.length < 3
            : newImages.secondary.length < 3
        }
        className={newImages.secondary.length >= 3 ? "hidden" : ""}
      />
      <PreviewImage
        files={newImages.secondary}
        className={newImages.secondary.length > 0 ? "" : "hidden"}
        onDelete={(index) => {
          setNewImages((prev) => ({
            ...prev,
            secondary: prev.secondary.filter((_, i) => i !== index),
          }));
        }}
      />
      <PreviewImage
        images={existingImages?.secondary}
        onDelete={(index) => {
          setImagesToDelete((prev) => [
            ...prev,
            existingImages.secondary[index],
          ]);
          setExistingImages((prev) => ({
            ...prev,
            secondary: prev.secondary.filter((_, i) => i !== index),
          }));
        }}
      />
    </div>
  );
};

export default UpsertProductImages;
