export const asyncForEach = async <V>(
  array: V[],
  callback: (data: V, index: number, array: V[]) => Promise<void>,
): Promise<void> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
