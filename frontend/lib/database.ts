import Dexie, { EntityTable } from "dexie";

export interface ImageRecord {
  id?: number;
  file: File;
  imageData: Blob;
  createdAt: Date;
}

const Database = new Dexie("FaceLensDB") as Dexie & {
  images: EntityTable<ImageRecord, "id">;
};

Database.version(1).stores({
  images: "++id, file, imageData, createdAt",
});

export default Database;
