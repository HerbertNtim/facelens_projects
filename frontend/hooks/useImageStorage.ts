import { useEffect, useState } from 'react'
import {
  saveImage,
  getImage,
  removeImage,
} from '@/lib/actions/image-storage'

export function useImageStorage() {
  const [file, setFile] =
    useState<File | null>(null)

  useEffect(() => {
    async function restore() {
      const image =
        await getImage()

      if (image) {
        setFile(image.file)
      }
    }

    restore()
  }, [])

  const save = async (
    image: File
  ) => {
    await saveImage(image)
    setFile(image)
  }

  const remove = async () => {
    await removeImage()
    setFile(null)
  }

  return {
    file,
    save,
    remove,
  }
}
