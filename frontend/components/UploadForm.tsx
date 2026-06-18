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

const UploadForm = () => {
  const form = useForm<GenderFormValues>({
    resolver: zodResolver(genderFormSchema),
    defaultValues: { imageFile: null },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    control,
  } = form;

  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    register("imageFile");
  }, [register]);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setValue("imageFile", nextFile, { shouldValidate: true });

    if (nextFile) {
      setPreviewURL(URL.createObjectURL(nextFile));
    }
  };

  const handleRemoveFile = () => {
    setValue("imageFile", null, { shouldValidate: false });
    setPreviewURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const imageFile = useWatch({ control, name: "imageFile" });
  const canSubmit = imageFile instanceof File && !isSubmitting;

  const onSubmit = async (data: GenderFormValues) => {
    if (!data.imageFile) return;

    const formData = new FormData();
    formData.append("imageFile", data.imageFile);

    try {
      const response = await fetch("http://localhost:8000/gender", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      localStorage.setItem("genderPrediction", JSON.stringify(result));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
