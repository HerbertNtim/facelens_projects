'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { UploadCloud, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { z } from 'zod'

const MAX_FILE_SIZE = 50 * 1024 * 1024

// Validation schema for the gender form.
// We use superRefine to validate the uploaded file object
// and provide custom error messages for missing, oversized,
// or non-image uploads.
const genderFormSchema = z
  .object({
    imageFile: z.instanceof(File).nullable(),
  })
  .superRefine((data, ctx) => {
    const file = data.imageFile

    if (!(file instanceof File)) {
      ctx.addIssue({
        path: ['imageFile'],
        code: 'custom',
        message: 'Image file is required',
      })
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        path: ['imageFile'],
        code: 'custom',
        message: 'Image file must be 50MB or smaller',
      })
    }

    if (!file.type.startsWith('image/')) {
      ctx.addIssue({
        path: ['imageFile'],
        code: 'custom',
        message: 'Image file must be a valid image',
      })
    }
  })

type GenderFormValues = z.infer<typeof genderFormSchema>

const UploadForm = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [toast, setToast] = React.useState<string | null>(null)

  const form = useForm<GenderFormValues>({
    resolver: zodResolver(genderFormSchema),
    defaultValues: { imageFile: null },
    mode: 'onTouched',
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form

  React.useEffect(() => {
    register('imageFile')
  }, [register])

  // watch the file field to enable/disable the submit button
  // without storing the full form state in a separate variable.
  const imageFile = useWatch({ control: form.control, name: 'imageFile' })
  const canSubmit = imageFile instanceof File && !isSubmitting

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null
    setValue('imageFile', nextFile, { shouldValidate: true })
  }

  const handleRemoveFile = () => {
    setValue('imageFile', null, { shouldValidate: true })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = async (data: GenderFormValues) => {
    setToast(null)
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.log('Begin Synthesis', data)
  }

  // Display a toast if validation fails during form submission.
  const onError = (errors: typeof form.formState.errors) => {
    const nextMessage = errors.imageFile?.message
    setToast(typeof nextMessage === 'string' ? nextMessage : 'Image file is required')
  }

  React.useEffect(() => {
    if (!toast) {
      return
    }

    const timeout = window.setTimeout(() => setToast(null), 3600)
    return () => window.clearTimeout(timeout)
  }, [toast])

  return (
    <div className="py-4 overflow-hidden">
      <div className="space-y-8">
        <Form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          <input
            id="imageFile"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleSelectFile}
          />

          <FormField>
            <FormItem>
              <FormLabel htmlFor="imageFile">Image file upload</FormLabel>
              <FormControl>
                <div
                  className="upload-dropzone"
                  onClick={openFilePicker}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      openFilePicker()
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <UploadCloud className="h-12 w-12 text-amber-500 dark:text-amber-400" />
                  {imageFile instanceof File ? (
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-foreground dark:text-white">{imageFile.name}</p>
                      <Button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleRemoveFile()
                        }}
                        className="upload-remove-button"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-foreground dark:text-white">Click to upload Image</p>
                      <p className="text-sm text-muted-foreground">Image file (max 50MB)</p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage>{typeof errors.imageFile?.message === 'string' ? errors.imageFile.message : ''}</FormMessage>
            </FormItem>

            <div className="upload-note-card">
              A warm and literary upload space for a single image.
            </div>
          </FormField>

          <div className="relative">
            <Button className="px-4 py-2 w-full cursor-pointer" type="submit" disabled={!canSubmit}>
              Begin Synthesis
            </Button>
            {isSubmitting ? (
              <div className="loading-overlay">
                <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white/95 px-6 py-5 text-slate-900 shadow-lg dark:border-slate-700 dark:bg-slate-950/90 dark:text-white">
                  <span className="h-9 w-9 animate-spin rounded-full border-4 border-transparent border-t-primary" />
                  <p className="text-sm font-medium">Weaving your image into the narrative…</p>
                </div>
              </div>
            ) : null}
          </div>
        </Form>

        {toast ? (
          <div className="toast-container" role="status" aria-live="polite">
            <div className="toast toast-error">{toast}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default UploadForm
