import { cn } from "@/utils/cn";
import React, { ComponentProps, useMemo, useRef, useState } from "react";
import ImageUp from "../Icons/ImageUp";
import { useTranslations } from "next-intl";
import { Button } from "housy-lib";
import Image from "next/image";
import XIcon from "../Icons/XIcon";
type Props = ComponentProps<"div">;

const DropContainer = ({ className }: Props) => {
  const t = useTranslations("Inventory");
  const [dragging, setDragging] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const previewList = useMemo(() => images, [images]);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log({ images });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    setImages((prev) => [...prev, ...Array.from(files)]);
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleFiles = (files: FileList) => {
    console.log({ files });
    const imagesFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    setImages((prev) => [...prev, ...imagesFiles]);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        className={cn(
          "border-dashed border border-border-2 rounded-md w-full h-72 gap-4 flex flex-col items-center justify-center dragover:bg-red-500",
          dragging && "bg-bg-2",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragging(false)}
      >
        <div
          className={cn(
            "flex flex-col items-center gap-4",
            dragging && "pointer-events-none",
          )}
        >
          <ImageUp className="w-8 h-8 stroke-current text-text-1" />
          <span className="text-sm">{t("form.imageDrop.text")}</span>
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            variant="outlined"
          >
            {t("form.imageDrop.button")}
          </Button>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
          ref={inputRef}
        />
      </div>
      {previewList.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {previewList.map((img, index) => {
            return (
              <div
                key={index}
                className="rounded-md overflow-hidden w-14 h-14 relative group"
              >
                <Image
                  className="w-full h-full object-cover"
                  src={URL.createObjectURL(img)}
                  alt={img.name}
                  width={50}
                  height={50}
                />
                <Button
                  variant="icon"
                  type="button"
                  className="bg-bg-2/50 rounded-md h-8 w-8 absolute top-0 right-0 left-0 hidden group-hover:flex bottom-0 m-auto"
                  onClick={() => {
                    setImages((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  <XIcon className="w-5 h-5 stroke-current" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropContainer;
