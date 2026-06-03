import { getDefaultDescription } from './getDefaultDescription';

export const parseDescription = <T extends object>(val: string): T => {
  try {
    return JSON.parse(val) as T;
  } catch (e) {
    if (e instanceof Error) {
      console.log('parseDescription error: ', e);
    }
    throw e;
  }
};

export const stringifyDescription = <T extends object>(
  val: T | null,
): string => {
  try {
    return val ? JSON.stringify(val) : JSON.stringify(getDefaultDescription());
  } catch (e) {
    if (e instanceof Error) {
      console.log('stringifyDescription error: ', e);
    }
    throw e;
  }
};
