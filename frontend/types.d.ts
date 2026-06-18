export interface StoredImage {
  id: number
  file: File
  createdAt: string
}

export interface UploadState {
  file: File | null
  previewUrl: string | null
}

export interface PredictionResponse {
  gender: string
  confidence: number
}

export interface PredictionState {
  loading: boolean
  result: PredictionResponse | null
  error: string | null
}

export interface ApiError {
  detail: string
}

export interface GenderSession {
  image: string; // base64 or objectURL
  prediction: PredictionResponse;
  createdAt: string;
}
