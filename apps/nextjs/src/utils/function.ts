import { isFunction } from './assertion';

export const runIfFn = <T, U>(
  valueOrFn: T | ((...fnArgs: U[]) => T),
  ...args: U[]
): T => (isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn);
