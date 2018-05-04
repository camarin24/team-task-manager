import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBDNLLjPcDNp3gHdui_7fmp4qRoZbDf-No",
    authDomain: "task-manager-7f49f.firebaseapp.com",
    databaseURL: "https://task-manager-7f49f.firebaseio.com",
    projectId: "task-manager-7f49f",
    storageBucket: "task-manager-7f49f.appspot.com",
    messagingSenderId: "37362402796"
};
const app = firebase.initializeApp(config);
const fireStore = firebase.firestore(app);
fireStore.settings({timestampsInSnapshots:true})
const db = {
    fire: app,
    loginProvider: new firebase.auth.GoogleAuthProvider(),
    db:fireStore
};

export default db;