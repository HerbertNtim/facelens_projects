"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LoadingOverlay from "./LoadingOverlay";
import FileUploader from "./FileUploader";
import {
  genderFormSchema,
  type GenderFormValues,
} from "@/lib/uploadFormSchema";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Database from "@/lib/database";

const UploadForm = () => {
  const form = useForm<GenderFormValues>({
    resolver: zodResolver(genderFormSchema),
    defaultValues: { imageFile: null },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    control,
  } = form;

  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSelectFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];

      if (!file) return;

      // Update form state
      setValue("imageFile", file, {
        shouldValidate: true,
      });

      // Remove old Image if any
      await Database.images.clear();

      // Generate unique ID for the new image
      const id = crypto.randomUUID();

      // Store the new image in IndexedDB
      await Database.images.add({
        id,
        imageFile: file,
        createdAt: new Date().toISOString(),
      });

      // Create a preview URL for the selected file
      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);
    } catch (error) {
      console.error("Error handling file selection:", error);
    }
  };

  const handleRemoveFile = async () => {
    try {
      // Reset form state
      setValue("imageFile", null, {
        shouldValidate: false,
      });

      // Clear the preview URL
      if(previewURL) {
        URL.revokeObjectURL(previewURL);
      }

      setPreviewURL(null);

      // Remove the image from IndexedDB
      await Database.images.clear();

      // Clear Hidden input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };

  const imageFile = useWatch({ control, name: "imageFile" });
  const canSubmit = imageFile instanceof File && !isSubmitting;

  const onSubmit = async (data: GenderFormValues) => {
    if (!data.imageFile) return;

    console.log("Submitting form with image file:", data.imageFile);
  };

  useEffect(() => {
    async function loadLastImage() {
      const image = await Database.images.orderBy('createdAt').last();

      if(!image) return;

      setValue("imageFile", image.imageFile)

      setPreviewURL(URL.createObjectURL(image.imageFile));
    }

    loadLastImage();
  }, [setValue]);

  return (
    <section className="flex flex-col mx-auto px-4">
      <div className="py-4 overflow-hidden">
        <div className="space-y-8">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FileUploader
              fileInputRef={fileInputRef}
              file={imageFile instanceof File ? imageFile : null}
              fileError={errors.imageFile?.message?.toString()}
              onSelectFile={handleSelectFile}
              onOpenFilePicker={openFilePicker}
              onRemoveFile={handleRemoveFile}
            />

            <div className="relative">
              <Button
                className="px-4 py-2 w-full cursor-pointer"
                type="submit"
                disabled={!canSubmit}
              >
                Begin Synthesis
              </Button>
              {isSubmitting && <LoadingOverlay />}
            </div>
          </Form>
        </div>
      </div>

      {previewURL && (
        <div className="my-8">
          <h2 className="text-lg font-medium mb-4">Image Preview:</h2>
          <Image
            src={previewURL}
            width={200}
            height={200}
            alt="Selected file preview"
            className="max-w-full h-auto rounded-md border"
          />
        </div>
      )}
    </section>
  );
};

export default UploadForm;
