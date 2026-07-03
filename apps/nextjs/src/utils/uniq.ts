export const uniq = <T>(arr: T[]) => {
  const tmp = new Set();
  return arr.filter((a) => !tmp.has(a) && tmp.add(a));
};
