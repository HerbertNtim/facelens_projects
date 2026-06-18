import { IMAGE_STORAGE_ID } from "../constants";
import { database } from "../database";

export async function saveImage(
  file: File
) {
  await database.uploads.put({
    id: IMAGE_STORAGE_ID,
    file,
    createdAt: new Date().toISOString(),
  })
}

export async function getImage() {
  return await database.uploads.get(
    IMAGE_STORAGE_ID
  )
}
