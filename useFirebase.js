import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export function useFirebase() {
  // CONFIG DETAILS ===============
  const firebaseConfig = {
    apiKey: "AIzaSyDKSA5nN9tkCNL6-oAgAsT4GDyww-b8DGQ",
    authDomain: "instagramclone-42c2c.firebaseapp.com",
    projectId: "instagramclone-42c2c",
    storageBucket: "instagramclone-42c2c.appspot.com",
    messagingSenderId: "138511774575",
    appId: "1:138511774575:web:7cf1fe85725c998f596e9a",
  };

  // Firebase Objects ===============
  const app = firebase.initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return {
    app,
    db,
    auth,
    storage,
  };
}
