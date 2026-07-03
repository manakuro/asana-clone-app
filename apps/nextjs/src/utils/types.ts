import type React from 'react';

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode);
