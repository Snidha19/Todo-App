import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '@/store/store';

const firebaseConfig = {
  apiKey: 'AIzaSyAHK1Hgx-J_sUNjSmAslby6D2mySNIjWio',
  authDomain: 'todos-9aa10.firebaseapp.com',
  projectId: 'todos-9aa10',
  storageBucket: 'todos-9aa10.appspot.com',
  messagingSenderId: '757729758687',
  appId: '1:757729758687:web:30ff368359fe509e14c86a',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user);
});

firebase.getCurrentUser = () => new Promise((resolve, reject) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    unsubscribe();
    resolve(user);
  }, reject);
});
// eslint-disable-next-line no-unused-vars
const db = firebase.firestore();

export default firebase;
