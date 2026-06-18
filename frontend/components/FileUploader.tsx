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

interface FileUploaderProps {
  file: File | null
  fileInputRef: React.RefObject<HTMLInputElement | null>
  fileError?: string
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void
  onOpenFilePicker: () => void
  onRemoveFile: () => void
}

export default function FileUploader({
  file,
  fileInputRef,
  fileError,
  onSelectFile,
  onOpenFilePicker,
  onRemoveFile,
}: FileUploaderProps) {
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
            onClick={onOpenFilePicker}
            onKeyDown={handleKeyDown}
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
                    event.stopPropagation()
                    onRemoveFile()
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
        </FormControl>

        <FormMessage>{fileError}</FormMessage>
      </FormItem>

      <div className="upload-note-card">
        A warm and literary upload space for a single image.
      </div>
    </FormField>
  )
}
