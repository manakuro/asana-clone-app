export const sizes = {
  lg: {
    w: '420px',
    h: 16,
  },
  md: {
    w: 60,
    h: 16,
  },
} as const;
export type Sizes = keyof typeof sizes;
