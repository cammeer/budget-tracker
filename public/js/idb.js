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

window.addEventListener('online', checkDatabase)
