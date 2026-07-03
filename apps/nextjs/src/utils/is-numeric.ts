export const isNumeric = (value: string | number) => {
  const isValid = typeof value === 'number' || typeof value === 'string';

  if (!isValid) {
    console.warn('【isNumeric】: Provide string or number', value);
  }

  return isValid && !Number.isNaN(Number(value));
};
