import * as React from 'react'
import { FieldErrors } from 'react-hook-form'
import { GenderFormValues } from './uploadFormSchema'

/**
 * Custom hook for managing toast notifications.
 *
 * Provides:
 * - Toast message state
 * - Function to display validation errors as toast
 * - Auto-dismiss toast after 3.6 seconds
 */
export const useToast = () => {
  const [toast, setToast] = React.useState<string | null>(null)

  /**
   * Display a validation error as a toast message.
   * If the error is not a string, displays a default message.
   */
  const showErrorToast = (errors: FieldErrors<GenderFormValues>) => {
    const nextMessage = errors.imageFile?.message
    setToast(
      typeof nextMessage === 'string'
        ? nextMessage
        : 'Image file is required'
    )
  }

  /**
   * Auto-dismiss the toast after 3.6 seconds
   */
  React.useEffect(() => {
    if (!toast) {
      return
    }

    const timeout = window.setTimeout(() => setToast(null), 3600)
    return () => window.clearTimeout(timeout)
  }, [toast])

  return {
    toast,
    setToast,
    showErrorToast,
  }
}
