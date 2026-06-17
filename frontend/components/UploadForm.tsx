'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast'

// Import schema and validation types
import {
  genderFormSchema,
  type GenderFormValues,
} from '@/lib/uploadFormSchema'

// Import custom hooks for form logic
import { useFilePickerLogic } from '@/lib/useFilePickerLogic'

// Import UI components
import LoadingOverlay from './LoadingOverlay'
import { UploadDropzone } from './UploadDropzone'

/**
 * UploadForm Component
 *
 * Main form component for uploading and processing images.
 * Handles:
 * - Form state management with react-hook-form
 * - File validation with Zod schema
 * - File picker interaction
 * - Toast notifications for errors
 * - Submit state and loading overlay
 */
const UploadForm = () => {
  // Initialize the form with validation schema
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

  // Register the file field with the form
  React.useEffect(() => {
    register('imageFile')
  }, [register])

  // Extract custom hooks for cleaner logic separation
  const { fileInputRef, handleSelectFile, handleRemoveFile, openFilePicker } =
    useFilePickerLogic(setValue)

  const [toastMessage, setToastMessage] = useState<string>("")
  const [toastOpen, setToastOpen] = useState(false)

  // Watch the file field to enable/disable the submit button
  const imageFile = useWatch({ control: form.control, name: 'imageFile' })
  const canSubmit = imageFile instanceof File && !isSubmitting

  /**
   * Handle form submission.
   * Simulates a brief processing delay then logs the data for processing.
   */
  const onSubmit = async (data: GenderFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.log('Begin Synthesis', data)
  }

  /**
   * Handle form validation errors.
   * Displays the first error as a toast notification.
   */
  const onError = (errors: typeof form.formState.errors) => {
    const nextMessage = errors.imageFile?.message

    setToastMessage(
      typeof nextMessage === 'string'
        ? nextMessage
        : 'Image file is required',
    )
    setToastOpen(true)
  }

  return (
    <ToastProvider>
    <div className="py-4 overflow-hidden">
      <div className="space-y-8">
        <Form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          {/* Render the upload dropzone component */}
          <UploadDropzone
            ref={undefined}
            fileInputRef={fileInputRef}
            imageFile={
              imageFile instanceof File ? imageFile : null
            }
            fileError={errors.imageFile?.message}
            onSelectFile={handleSelectFile}
            onOpenFilePicker={openFilePicker}
            onRemoveFile={handleRemoveFile}
          />

          {/* Submit button with loading state */}
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

        <Toast
          open={toastOpen}
          onOpenChange={setToastOpen}
          duration={3600}
          type="error"
        >
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>{toastMessage}</ToastDescription>
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  )
}

export default UploadForm

