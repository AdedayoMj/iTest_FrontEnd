import * as firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/firestore';
import config from './config';

// Initialize Firebase
const Firebase = firebase.initializeApp(config.firebase);
export const provider = new GoogleAuthProvider();
//get auth from firebase
export const auth = getAuth();
export default Firebase;
