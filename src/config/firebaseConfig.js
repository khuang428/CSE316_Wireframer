import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
    apiKey: "AIzaSyDB5Kb8VehdWUJatWc5zCfrqGVwaDs64fs",
    authDomain: "khuang-316-wireframer.firebaseapp.com",
    databaseURL: "https://khuang-316-wireframer.firebaseio.com",
    projectId: "khuang-316-wireframer",
    storageBucket: "khuang-316-wireframer.appspot.com",
    messagingSenderId: "694101207950",
    appId: "1:694101207950:web:7efd3ef91e8d8ebd8ad2df",
    measurementId: "G-2DB3LYS2T2"
  };
firebase.initializeApp(firebaseConfig);

export default firebase;