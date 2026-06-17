import { z } from 'zod'

/**
 * Maximum file size for uploads: 50MB
 */
export const MAX_FILE_SIZE = 50 * 1024 * 1024

/**
 * Validation schema for the gender form.
 * Uses superRefine to validate the uploaded file object and provide
 * custom error messages for missing, oversized, or non-image uploads.
 *
 * Rules:
 * - File must be provided (not null)
 * - File size cannot exceed 50MB
 * - File must be a valid image type (image/*)
 */
export const genderFormSchema = z
  .object({
    imageFile: z.instanceof(File).nullable(),
  })
  .superRefine((data, ctx) => {
    const file = data.imageFile

    // Validate that a file was provided
    if (!(file instanceof File)) {
      ctx.addIssue({
        path: ['imageFile'],
        code: 'custom',
        message: 'Image file is required',
      })
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        path: ['imageFile'],
        code: 'custom',
        message: 'Image file must be 50MB or smaller',
      })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      ctx.addIssue({
        path: ['imageFile'],
        code: 'custom',
        message: 'Image file must be a valid image',
      })
    }
  })

export type GenderFormValues = z.infer<typeof genderFormSchema>
