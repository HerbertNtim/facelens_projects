import { getImage } from '@/lib/actions/image-storage'
import { predictGender } from '@/lib/api'

export async function runPrediction() {
  const storedImage =
    await getImage()

  if (!storedImage) {
    throw new Error(
      'No image uploaded'
    )
  }

  return predictGender(
    storedImage.file
  )
}
