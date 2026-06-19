export interface SessionRecord {
  id: unknown,
  imageFile: File
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

export interface GenderSession {
  image: string; // base64 or objectURL
  prediction: PredictionResponse;
  createdAt: string;
}
