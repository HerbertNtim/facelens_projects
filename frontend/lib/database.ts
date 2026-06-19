// db.ts
import { SessionRecord } from '@/types';
import Dexie, { EntityTable } from 'dexie';


const Database = new Dexie('NextFormDB') as Dexie & {
  images: EntityTable<SessionRecord, 'id'>;
};

Database.version(1).stores({
  images: '++id, createdAt' // 'imageData' is omitted to prevent indexing errors
});

export default Database;   
