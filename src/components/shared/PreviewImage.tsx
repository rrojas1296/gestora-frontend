import { Button } from "gestora-lib";
import Image from "next/image";
import React from "react";
import XIcon from "../Icons/XIcon";
import { cn } from "@/utils/cn";
import { ProductImage } from "@/types/api/inventory";

interface Props {
  files?: File[];
  images?: ProductImage[];
  onDelete: (index: number) => void;
  className?: string;
}

const PreviewImage = ({ files, images, onDelete, className }: Props) => {
  return (
    <div className={cn("grid gap-4", className)}>
      {!files &&
        images?.map((image, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center gap-4 py-2 px-2 rounded-md border border-border-1"
            >
              <div className="flex gap-4 items-center">
                <Image
                  src={image.url}
                  alt={image.id}
                  width={50}
                  height={50}
                  className="rounded-md object-cover w-14 h-14"
                />
                <p className="text-sm text-text-1">{image.name}</p>
              </div>
              <Button
                variant="icon"
                onClick={() => onDelete(index)}
                className="w-10 h-10 shrink-0"
                type="button"
              >
                <XIcon className="w-5 h-5 stroke-current text-text-1" />
              </Button>
            </div>
          );
        })}
      {!images &&
        files?.map((file, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center gap-4 py-2 px-2 rounded-md border border-border-1"
            >
              <div className="flex gap-4 items-center">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover w-14 h-14"
                />
                <p className="text-sm text-text-1">{file.name}</p>
              </div>
              <Button
                variant="icon"
                onClick={() => onDelete(index)}
                className="w-10 h-10 shrink-0"
                type="button"
              >
                <XIcon className="w-5 h-5 stroke-current text-text-1" />
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default PreviewImage;
