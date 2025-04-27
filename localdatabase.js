// Local Storage with IndexedDB
const DB_NAME = 'LiTeAI';
const DB_VERSION = 1;

let db;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject('Database error: ' + event.target.errorCode);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('modelData')) {
        db.createObjectStore('modelData', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

function saveModelData(data) {
  const transaction = db.transaction(['modelData'], 'readwrite');
  const store = transaction.objectStore('modelData');
  store.put(data);
}

function getModelData(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['modelData'], 'readonly');
    const store = transaction.objectStore('modelData');
    const request = store.get(id);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('Error getting model data: ' + event.target.errorCode);
    };
  });
}

export { openDatabase, saveModelData, getModelData };
