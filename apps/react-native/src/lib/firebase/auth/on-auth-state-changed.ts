import {
  getAuth,
  onAuthStateChanged as onAuthStateChangedRNFB,
} from '@react-native-firebase/auth';
import type { RestParams } from '@/lib/firebase/types';

export const onAuthStateChanged = (
  ...args: RestParams<Parameters<typeof onAuthStateChangedRNFB>>
) => {
  return onAuthStateChangedRNFB(getAuth(), ...args);
};
