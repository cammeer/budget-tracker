// let db
let db

//establish connection
const request = indexedDB.open('budget', 1)

// Object store
request.onupgradeneeded = (e) => {
  const db = e.target.result
  const pendingStore = db.createObjectStore('pending', {
    autoIncrement: true,
  })
}

request.onsuccess = (e) => {
  db = e.target.result
  if (navigator.onLine) checkDatabase()
}

request.onerror = (e) => {
  console.log(e.target.errorCode)
}

const saveRecord = (record) => {
  // create transaction
  const transaction = db.transaction(['pending'], 'readwrite')

  // access object store.
  const pendingStore = transaction.objectStore('pending')

  // add record
  pendingStore.add(record)
}

window.addEventListener('online', checkDatabase)
