import * as React from 'react'
import { UseFormSetValue, UseWatchReturn } from 'react-hook-form'
import { GenderFormValues } from './uploadFormSchema'

/**
 * Custom hook for managing file picker and file selection logic.
 *
 * Provides:
 * - File input ref for programmatic access
 * - Functions to open the file picker and handle file selection/removal
 * - Controlled state management for file operations
 */
export const useFilePickerLogic = (
  setValue: UseFormSetValue<GenderFormValues>,
) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  /**
   * Programmatically open the file picker dialog
   */
  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  /**
   * Handle file selection from the picker or drag-drop.
   * Validates and updates the form state.
   */
  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null
    setValue('imageFile', nextFile, { shouldValidate: true })
  }

  /**
   * Remove the currently selected file and clear the input.
   */
  const handleRemoveFile = () => {
    setValue('imageFile', null, { shouldValidate: true })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return {
    fileInputRef,
    openFilePicker,
    handleSelectFile,
    handleRemoveFile,
  }
}
