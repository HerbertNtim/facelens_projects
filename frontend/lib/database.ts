// lib/db.ts

import Dexie from 'dexie'

export const db = new Dexie('gender-ai')

db.version(1).stores({
  uploads: 'id',
})How
