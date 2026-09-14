export type RestParams<T extends any[], N extends number = 1> = N extends 0
  ? T
  : N extends 1
    ? T extends [any, ...infer Rest]
      ? Rest
      : []
    : N extends 2
      ? T extends [any, any, ...infer Rest]
        ? Rest
        : []
      : N extends 3
        ? T extends [any, any, any, ...infer Rest]
          ? Rest
          : []
        : [];
