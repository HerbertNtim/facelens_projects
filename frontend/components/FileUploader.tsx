"use client";

import * as React from "react";
import { UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  file: File | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

export default function FileUploader({
  file,
  fileInputRef,
  onSelectFile,
  onRemoveFile,
}: FileUploaderProps) {
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        id="imageFile"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onSelectFile}
      />

      <div
        className="upload-dropzone"
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFilePicker();
          }
        }}
      >
        <UploadCloud className="h-12 w-12 text-amber-500 dark:text-amber-400" />

        {file ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground dark:text-white">
              {file.name}
            </p>

            <Button
              type="button"
              className="upload-remove-button"
              onClick={(event) => {
                event.stopPropagation();
                onRemoveFile();
              }}
            >
              <X className="h-4 w-4" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground dark:text-white">
              Click to upload Image
            </p>

            <p className="text-sm text-muted-foreground">
              Image file (max 50MB)
            </p>
          </div>
        )}
      </div>
    </>
  );
}
