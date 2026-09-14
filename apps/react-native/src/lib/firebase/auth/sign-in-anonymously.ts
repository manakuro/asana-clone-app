import {
  getAuth,
  signInAnonymously as signInAnonymouslyRNFB,
} from '@react-native-firebase/auth';

export const signInAnonymously = async () => {
  return await signInAnonymouslyRNFB(getAuth());
};
