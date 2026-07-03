export const ulidRegex = '[0-9A-Z]{29}';

export const isULID = (val: any): boolean => {
  if (typeof val !== 'string') return false;

  const regex = new RegExp(ulidRegex, 'iu');

  return regex.test(val);
};
