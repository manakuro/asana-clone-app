import { act } from '@testing-library/react';

export const wait = async (ms?: number): Promise<void> => {
  await act(() => {});
  return new Promise((resolve) => setTimeout(resolve, ms ?? 0));
};
