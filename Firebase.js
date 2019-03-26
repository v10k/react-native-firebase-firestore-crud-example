import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyATtA9ZH9yvlprh5FUnHhpdlSJ3P_Fvl_I",
  authDomain: "crud-68052.firebaseapp.com",
  databaseURL: "https://crud-68052.firebaseio.com",
  projectId: "crud-68052",
  storageBucket: "crud-68052.appspot.com",
  messagingSenderId: "906939110990"
};
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;
