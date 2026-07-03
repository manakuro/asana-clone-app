import isEqual from 'lodash-es/isEqual';

export const isDescriptionEqual = (value: unknown, other: unknown): boolean => {
  if (!value || !other) return false;

  return isEqual(value, other);
};
