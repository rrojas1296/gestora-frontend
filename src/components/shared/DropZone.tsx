import { cn } from "@/utils/cn";
import React, { ComponentProps, DragEvent, useRef, useState } from "react";
import ImageUp from "../Icons/ImageUp";
import { Button } from "gestora-lib";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import PreviewImage from "./PreviewImage";

type Props = ComponentProps<"div"> & {
  images: File[];
  trigger: UseFormTrigger<any>;
  setValue: UseFormSetValue<any>;
  placeholder: string;
  buttonText: string;
  name: string;
  limit?: number;
  error?: string;
  zoneClassName?: string;
};

const DropZone = ({
  className,
  images = [],
  setValue,
  trigger,
  error,
  placeholder,
  buttonText,
  zoneClassName,
  name,
  limit = 5,
}: Props) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newImages = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    setDragging(false);
    if (newImages.length === 0) return;
    setValue(name, [...images, ...newImages]);
    trigger(name);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleFiles = (files: FileList) => {
    const newImages = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    setValue(name, [...images, ...newImages]);
    trigger(name);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {images.length < limit && (
        <div
          className={cn(
            "border-dashed border border-border-1 rounded-md w-full h-44 gap-4 flex flex-col items-center justify-center",
            zoneClassName,
            dragging && "bg-bg-2",
            error && "border-danger",
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
            <span className="text-sm">{placeholder}</span>
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              variant="outlined"
            >
              {buttonText}
            </Button>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                handleFiles(e.target.files);
              }
              e.target.value = "";
            }}
            ref={inputRef}
          />
        </div>
      )}
      {images.length > 0 && (
        <PreviewImage
          images={images}
          onDelete={(index) => {
            setValue(
              name,
              images.filter((_, i) => i !== index),
              {
                shouldValidate: true,
              },
            );
          }}
        />
      )}
      {error && <span className="text-danger text-sm">{error}</span>}
    </div>
  );
};

export default DropZone;
