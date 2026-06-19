const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function predictGender(
  file: File
) {
  const formData = new FormData()

  formData.append('file', file)

  const response = await fetch(
    `${API_URL}/predict-gender`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error(
      'Prediction failed'
    )
  }

  return response.json()
}
