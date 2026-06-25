export const uniqBy = <Data>(arr: Data[], by: keyof Data): Data[] => {
  const tmp = new Set();
  return (arr?.filter((a: any) => !tmp.has(a[by]) && tmp.add(a[by])) ||
    []) as Data[];
};
