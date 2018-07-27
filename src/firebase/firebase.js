import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyAzUyIG5buO5C-ihnj2foId9jByUKzS0L8",
  authDomain: "react-test-task.firebaseapp.com",
  databaseURL: "https://react-test-task.firebaseio.com",
  projectId: "react-test-task",
  storageBucket: "react-test-task.appspot.com",
  messagingSenderId: "256403123888"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();