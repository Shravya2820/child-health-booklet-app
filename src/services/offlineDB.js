import { openDB } from 'idb'

const DB_NAME = 'child-health-db'
const DB_VERSION = 1
const STORE_NAME = 'records'

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, {
        keyPath: 'healthId',
      })
    }
  },
})

export async function saveRecord(record) {
  const db = await dbPromise
  await db.put(STORE_NAME, record)
}

export async function getAllRecords() {
  const db = await dbPromise
  return await db.getAll(STORE_NAME)
}

export async function markAsSynced(healthId) {
  const db = await openDB("child-health-db", 1);
  const tx = db.transaction("records", "readwrite");
  const store = tx.objectStore("records");

  const record = await store.get(healthId);
  if (record) {
    record.synced = true;
    await store.put(record);
  }

  await tx.done;
}