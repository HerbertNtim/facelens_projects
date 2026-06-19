// db.ts
import Dexie, { EntityTable } from 'dexie';

export interface SessionRecord {
  id?: number;
  imageFile: File;
  prediction: unknown; // Critical: Store as Blob, do NOT index
  createdAt: Date;
}

const Database = new Dexie('NextFormDB') as Dexie & {
  images: EntityTable<SessionRecord, 'id'>;
};

Database.version(1).stores({
  images: '++id, createdAt' // 'imageData' is omitted to prevent indexing errors
});

export default Database;   
