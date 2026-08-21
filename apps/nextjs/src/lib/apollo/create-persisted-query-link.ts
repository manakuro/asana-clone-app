import { PersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

export const createPersistedQueryLink = () => {
  return new PersistedQueryLink({
    sha256,
    useGETForHashedQueries: true,
  });
};
