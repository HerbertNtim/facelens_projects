'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { UploadCloud, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { z } from 'zod'

const MAX_FILE_SIZE = 50 * 1024 * 1024

const genderFormSchema = z.object({
  imageFile: z
    .union([z.instanceof(File), z.null()])
    .refine((value) => value instanceof File, { message: 'Image file is required' })
    .refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, {
      message: 'Image file must be 50MB or smaller',
    })
    .refine((file) => file instanceof File && file.type.startsWith('image/'), {
      message: 'Image file must be a valid image',
    }),
})

type GenderFormValues = z.infer<typeof genderFormSchema>

const UploadForm = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const form = useForm<GenderFormValues>({
    resolver: zodResolver(genderFormSchema),
    defaultValues: { imageFile: null },
    mode: 'onTouched',
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form

  React.useEffect(() => {
    register('imageFile')
  }, [register])

  const imageFile = watch('imageFile')

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
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.log('Begin Synthesis', data)
  }

  return (
    <div className="new-book-wrapper container mx-auto max-w-2xl rounded-[2.5rem] border border-slate-200 bg-white/90 p-8 shadow-[0_32px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-none">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Gender Prediction</p>
          <h2 className="text-3xl font-semibold leading-tight text-foreground dark:text-white">
            Bring your portrait into a soft, literary frame
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Upload a single image and let the synthesis begin with an intimate, book-like rhythm.
          </p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                  className="upload-dropzone relative flex min-h-55 cursor-pointer flex-col items-center justify-center gap-4 rounded-4xl border-2 border-dashed border-slate-300 bg-slate-50 px-8 py-12 text-center text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
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
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleRemoveFile()
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-foreground dark:text-white">Click to upload Image</p>
                      <p className="text-sm text-muted-foreground">Image file (max 50MB)</p>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage>{errors.imageFile?.message}</FormMessage>
            </FormItem>

            <div className="mt-2 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              A warm and literary upload space for a single image.
            </div>
          </FormField>

          <div className="relative">
            <Button className="form-btn w-full" type="submit" disabled={isSubmitting}>
              Begin Synthesis
            </Button>
            {isSubmitting ? (
              <div className="loading-overlay absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-slate-950/10 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white/95 px-6 py-5 text-slate-900 shadow-lg dark:border-slate-700 dark:bg-slate-950/90 dark:text-white">
                  <span className="h-9 w-9 animate-spin rounded-full border-4 border-transparent border-t-primary" />
                  <p className="text-sm font-medium">Weaving your image into the narrative…</p>
                </div>
              </div>
            ) : null}
          </div>
        </Form>
      </div>
    </div>
  )
}

export default UploadForm
