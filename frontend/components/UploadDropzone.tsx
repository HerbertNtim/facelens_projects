'use client'

import * as React from 'react'
import { UploadCloud, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'

interface UploadDropzoneProps {
  /** Reference to the hidden file input element */
  fileInputRef: React.RefObject<HTMLInputElement | null>
  /** Current selected file or null */
  imageFile: File | null
  /** Error message to display, if any */
  fileError?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  /** Callback when file is selected */
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Callback when file picker is opened */
  onOpenFilePicker: () => void
  /** Callback when file is removed */
  onRemoveFile: () => void
}

/**
 * UploadDropzone Component
 *
 * Renders an interactive drag-and-drop zone for image uploads.
 * Displays the file picker UI, selected file preview, and error messages.
 */
export const UploadDropzone = React.forwardRef<
  HTMLDivElement,
  UploadDropzoneProps
>(
  (
    {
      fileInputRef,
      imageFile,
      fileError,
      onSelectFile,
      onOpenFilePicker,
      onRemoveFile,
    },
    ref
  ) => {
    /**
     * Handle keyboard navigation for accessibility.
     * Allow Enter and Space keys to trigger file picker.
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onOpenFilePicker()
      }
    }

    return (
      <FormField>
        <FormItem>
          <FormLabel htmlFor="imageFile">Image file upload</FormLabel>
          <FormControl>
            {/* Hidden file input for actual file selection */}
            <input
              id="imageFile"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onSelectFile}
            />

            {/* Interactive dropzone area */}
            <div
              ref={ref}
              className="upload-dropzone"
              onClick={onOpenFilePicker}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              <UploadCloud className="h-12 w-12 text-amber-500 dark:text-amber-400" />

              {/* Show file preview if file is selected */}
              {imageFile instanceof File ? (
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-foreground dark:text-white">
                    {imageFile.name}
                  </p>
                  <Button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      onRemoveFile()
                    }}
                    className="upload-remove-button"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              ) : (
                /* Show default upload prompt */
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
          </FormControl>

          {/* Display validation error, if any */}
          <FormMessage>
            {typeof fileError === 'string' ? fileError : ''}
          </FormMessage>
        </FormItem>

        {/* Informational note about the upload space */}
        <div className="upload-note-card">
          A warm and literary upload space for a single image.
        </div>
      </FormField>
    )
  }
)

UploadDropzone.displayName = 'UploadDropzone'
