import {
  getAuth as getAuthFirebase,
  onAuthStateChanged as onAuthStateChangedFirebase,
  onIdTokenChanged as onIdTokenChangedFirebase,
  signInAnonymously as signInAnonymouslyFirebase,
} from 'firebase/auth';
import { firebaseApp } from './app';

export const getAuth = () => getAuthFirebase(firebaseApp);

export const signInAnonymously = () => signInAnonymouslyFirebase(getAuth());

export const onAuthStateChanged = (
  nextOrObserver: Parameters<typeof onAuthStateChangedFirebase>[1],
) => {
  return onAuthStateChangedFirebase(getAuth(), nextOrObserver);
};

export const onIdTokenChanged = (
  nextOrObserver: Parameters<typeof onIdTokenChangedFirebase>[1],
) => {
  return onIdTokenChangedFirebase(getAuth(), nextOrObserver);
};

export const refreshToken = () => {
  return getAuth().currentUser?.getIdToken(true);
};
