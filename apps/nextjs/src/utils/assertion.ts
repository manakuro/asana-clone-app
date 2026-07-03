// biome-ignore lint/complexity/noBannedTypes: should replace native function
export const isFunction = (value: any): value is Function =>
  typeof value === 'function';
