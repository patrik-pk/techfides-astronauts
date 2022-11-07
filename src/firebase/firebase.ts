import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBKIHUfDNtOM9XqZFlWfMy0B2RmeHQ8GHA',
  authDomain: 'techfides-astronauts.firebaseapp.com',
  projectId: 'techfides-astronauts',
  storageBucket: 'techfides-astronauts.appspot.com',
  messagingSenderId: '995397864142',
  appId: '1:995397864142:web:292d4a626c013039cade9f'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const astronautsCollectionRef = collection(db, 'astronauts')
