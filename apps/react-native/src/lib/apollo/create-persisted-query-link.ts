import { PersistedQueryLink } from '@apollo/client/link/persisted-queries';
import * as Crypto from 'expo-crypto';

export const createPersistedQueryLink = () => {
  return new PersistedQueryLink({
    sha256: (queryString) =>
      Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        queryString,
      ),
    useGETForHashedQueries: true,
  });
};
