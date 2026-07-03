export const omit = <Object, Key extends keyof Object>(
  obj: Object,
  key: Key,
) => {
  const { [key]: _, ...rest } = obj;

  return rest;
};
