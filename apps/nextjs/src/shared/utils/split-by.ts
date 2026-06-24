export const splitByNumber = <T>(array: T[], num: number) => {
  return [...new Array(num)].map((_, resultIndex) => {
    const result = [];
    for (let i = 0; i <= array.length; i += num) {
      const index = i + resultIndex;
      if (array[index]) result.push(array[index]);
    }
    return result;
  });
};
