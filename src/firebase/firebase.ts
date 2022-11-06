// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBKIHUfDNtOM9XqZFlWfMy0B2RmeHQ8GHA',
  authDomain: 'techfides-astronauts.firebaseapp.com',
  projectId: 'techfides-astronauts',
  storageBucket: 'techfides-astronauts.appspot.com',
  messagingSenderId: '995397864142',
  appId: '1:995397864142:web:292d4a626c013039cade9f'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
