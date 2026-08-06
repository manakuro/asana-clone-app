type Brand<K, T> = K & { readonly __brand: T };

export type IdToken = Brand<string, 'IdToken'>;
export type RefreshToken = Brand<string, 'RefreshToken'>;

export type StoredToken = {
  idToken: IdToken;
  refreshToken: RefreshToken;
  expiresAt: number;
};
