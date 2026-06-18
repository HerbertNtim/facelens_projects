import Dexie from 'dexie'
import type { StoredImage } from '@/types'

class GenderAIDatabase extends Dexie {
  uploads!: Dexie.Table<StoredImage, number>

  constructor() {
    super('gender-ai-db')

    this.version(1).stores({
      uploads: 'id',
    })
  }
}

export const database = new GenderAIDatabase()
