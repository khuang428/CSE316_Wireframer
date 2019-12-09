import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
  apiKey: "AIzaSyDOUeIGG9-88iXdjWJR9XikCJjp_-ok9-s",
  authDomain: "khuang-316-wireframer-86bff.firebaseapp.com",
  databaseURL: "https://khuang-316-wireframer-86bff.firebaseio.com",
  projectId: "khuang-316-wireframer-86bff",
  storageBucket: "khuang-316-wireframer-86bff.appspot.com",
  messagingSenderId: "741561387935",
  appId: "1:741561387935:web:744d2a535962a194b18baa",
  measurementId: "G-5PW7CF8NV9"
};
firebase.initializeApp(firebaseConfig);

export default firebase;