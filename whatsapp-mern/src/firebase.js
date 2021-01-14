import firebase from 'firebase'
// import 'firebase/auth'
// import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBheE1ZqPDfdUKIc77cQrN12b2qFVEo_bA',
  authDomain: 'whatsapp-clone-yogesh-ca1c4.firebaseapp.com',
  projectId: 'whatsapp-clone-yogesh-ca1c4',
  storageBucket: 'whatsapp-clone-yogesh-ca1c4.appspot.com',
  messagingSenderId: '487181071253',
  appId: '1:487181071253:web:8673bf5e5988112ab5fc9c',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
