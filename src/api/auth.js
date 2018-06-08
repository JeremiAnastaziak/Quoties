import * as firebase from 'firebase';
import { config } from '../private/config';

export function initFirebase() {
    firebase.initializeApp(config);
}

export function loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
    firebase.auth().signInWithPopup(provider)
    .catch(console.error);
}

export function logInAnonymously() {
    firebase.auth().signInAnonymously()
    .catch(console.error);
}
