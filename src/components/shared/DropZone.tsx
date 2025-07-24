import { cn } from "@/utils/cn";
import React, { ComponentProps, DragEvent, useRef, useState } from "react";
import ImageUp from "../Icons/ImageUp";
import { Button } from "gestora-lib";

type Props = ComponentProps<"div"> & {
  placeholder: string;
  buttonText: string;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  show: boolean;
  error?: string;
  zoneClassName?: string;
};

const DropZone = ({
  error,
  placeholder,
  buttonText,
  setImages,
  zoneClassName,
  show = true,
}: Props) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    setDragging(false);
    if (newFiles.length === 0) return;
    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    setImages((prev) => [...prev, ...newFiles]);
  };

  return show ? (
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
  ) : null;
};

export default DropZone;
