import { PersistedQueryLink } from '@apollo/client/link/persisted-queries';

export const createPersistedQueryLink = () => {
  return new PersistedQueryLink({
    sha256: async (queryString: string): Promise<string> => {
      const encoder = new TextEncoder();
      const data = encoder.encode(queryString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    },
  });
};
