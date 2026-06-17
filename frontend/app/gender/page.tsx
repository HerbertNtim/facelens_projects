"use client";

import * as React from "react";
import Image from "next/image";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  imageFile: z
    .instanceof(File, { message: "Please choose an image file." })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed.",
    }),
});

const GenderPage = () => {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const previewUrl = React.useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile]
  );
  const [prediction, setPrediction] = React.useState<string>(
    "Upload an image to get a gender prediction."
  );
  const [imageError, setImageError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!previewUrl) return;
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
    setPrediction(
      file
        ? "Image selected. Click Predict to see your result."
        : "Upload an image to get a gender prediction."
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setImageError(null);

    const validation = formSchema.safeParse({ imageFile });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setImageError(fieldErrors.imageFile?.[0] ?? "Please choose a valid image.");
      setPrediction("Please fix the image upload error before submitting.");
      return;
    }

    setPrediction("Prediction ready. Send this file to your model endpoint.");
  };

  return (
    <main className="page min-h-screen py-16">
      <div className="wrapper mx-auto max-w-4xl px-4">
        <div className="workflow-panel space-y-8">
          <div>
            <h1 className="page-title">Gender Detection</h1>
            <p className="page-description">
              Upload a single image file and get a gender prediction result below. The form uses shadcn-style structure and zod validation.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm dark:bg-secondary dark:border-input">
            <Form onSubmit={handleSubmit} className="space-y-6">
              <FormField>
                <FormItem>
                  <FormLabel htmlFor="image-upload">Upload your image</FormLabel>
                  <p className="text-sm text-muted dark:text-muted-foreground">
                    Only one image is required. Supported formats: JPG, PNG, WEBP.
                  </p>
                  <FormControl>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full cursor-pointer rounded-3xl border border-border bg-background-alt px-4 py-4 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 dark:bg-secondary dark:text-white dark:border-input"
                    />
                  </FormControl>
                  {imageError ? <FormMessage>{imageError}</FormMessage> : null}
                </FormItem>
              </FormField>

              {previewUrl ? (
                <div className="overflow-hidden rounded-3xl border border-border bg-background-alt p-4 dark:bg-secondary dark:border-input">
                  <p className="mb-3 text-sm font-medium text-foreground dark:text-white">
                    Preview
                  </p>
                  <div className="relative h-72 w-full overflow-hidden rounded-3xl">
                    <Image
                      src={previewUrl}
                      alt="Selected image preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted dark:text-muted-foreground">
                  Selected file: {imageFile?.name ?? "None"}
                </p>
                <Button type="submit" variant="hero" className="w-full sm:w-auto">
                  Predict Gender
                </Button>
              </div>
            </Form>
          </div>

          <div className="rounded-3xl border border-border bg-background-alt p-8 shadow-sm dark:bg-secondary dark:border-input">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground dark:text-white">
                  Prediction Result
                </h2>
                <p className="text-sm text-muted dark:text-muted-foreground">
                  Results update after the form is submitted.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 text-sm text-foreground dark:bg-secondary dark:border-input dark:text-white">
              {prediction}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GenderPage;
