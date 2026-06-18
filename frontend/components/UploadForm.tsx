'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import LoadingOverlay from './LoadingOverlay'
import FileUploader from './FileUploader'
import {
  genderFormSchema,
  type GenderFormValues,
} from '@/lib/uploadFormSchema'

const UploadForm = () => {
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
    control,
  } = form

  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    register('imageFile')
  }, [register])

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

  const imageFile = useWatch({ control, name: 'imageFile' })
  const canSubmit = imageFile instanceof File && !isSubmitting

  const onSubmit = async (data: GenderFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.log('Begin Synthesis', data)
  }

  return (
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
  )
}

export default UploadForm

