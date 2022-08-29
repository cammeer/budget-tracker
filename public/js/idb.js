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

  // access object store
  const pendingStore = transaction.objectStore('pending')

  // add record
  pendingStore.add(record)
}

const checkDatabase = () => {
  // open transaction
  const transaction = db.transaction(['pending'], 'readwrite')
  // access object store
  const pendingStore = transaction.objectStore('pending')
  // get all records
  const getAll = pendingStore.getAll()

  getAll.onsuccess = async () => {
    if (getAll.result.length > 0) {
      const res = await fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })

      await res.json()

      // open transaction
      const transaction = db.transaction(['pending'], 'readwrite')

      // access object store
      const pendingStore = transaction.objectStore('pending')

      // clear all
      pendingStore.clear()
    }
  }
}

window.addEventListener('online', checkDatabase)
