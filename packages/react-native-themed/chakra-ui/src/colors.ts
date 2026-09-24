/**
 * Color tokens mirroring Chakra UI's Color Tokens / Semantic Tokens.
 * https://www.chakra-ui.com/docs/theming/colors
 */

export const colorTokens = {
  white: '#ffffff',
  black: '#000000',
  'gray.50': '#fafafa',
  'gray.100': '#f4f4f5',
  'gray.200': '#e4e4e7',
  'gray.300': '#d4d4d8',
  'gray.400': '#a1a1aa',
  'gray.500': '#71717a',
  'gray.600': '#52525b',
  'gray.700': '#3f3f46',
  'gray.800': '#27272a',
  'gray.900': '#18181b',
  'gray.950': '#111111',

  'neutral.50': '#fafafa',
  'neutral.100': '#f5f5f5',
  'neutral.200': '#e5e5e5',
  'neutral.300': '#d4d4d4',
  'neutral.400': '#a3a3a3',
  'neutral.500': '#737373',
  'neutral.600': '#525252',
  'neutral.700': '#404040',
  'neutral.800': '#262626',
  'neutral.900': '#171717',
  'neutral.950': '#0a0a0a',

  'red.50': '#fef2f2',
  'red.100': '#fee2e2',
  'red.200': '#fecaca',
  'red.300': '#fca5a5',
  'red.400': '#f87171',
  'red.500': '#ef4444',
  'red.600': '#dc2626',
  'red.700': '#991919',
  'red.800': '#511111',
  'red.900': '#300c0c',
  'red.950': '#1f0808',

  'orange.50': '#fff7ed',
  'orange.100': '#ffedd5',
  'orange.200': '#fed7aa',
  'orange.300': '#fdba74',
  'orange.400': '#fb923c',
  'orange.500': '#f97316',
  'orange.600': '#ea580c',
  'orange.700': '#92310a',
  'orange.800': '#6c2710',
  'orange.900': '#3b1106',
  'orange.950': '#220a04',

  'yellow.50': '#fefce8',
  'yellow.100': '#fef9c3',
  'yellow.200': '#fef08a',
  'yellow.300': '#fde047',
  'yellow.400': '#facc15',
  'yellow.500': '#eab308',
  'yellow.600': '#ca8a04',
  'yellow.700': '#845209',
  'yellow.800': '#713f12',
  'yellow.900': '#422006',
  'yellow.950': '#281304',

  'green.50': '#f0fdf4',
  'green.100': '#dcfce7',
  'green.200': '#bbf7d0',
  'green.300': '#86efac',
  'green.400': '#4ade80',
  'green.500': '#22c55e',
  'green.600': '#16a34a',
  'green.700': '#116932',
  'green.800': '#124a28',
  'green.900': '#042713',
  'green.950': '#03190c',

  'teal.50': '#f0fdfa',
  'teal.100': '#ccfbf1',
  'teal.200': '#99f6e4',
  'teal.300': '#5eead4',
  'teal.400': '#2dd4bf',
  'teal.500': '#14b8a6',
  'teal.600': '#0d9488',
  'teal.700': '#0c5d56',
  'teal.800': '#114240',
  'teal.900': '#032726',
  'teal.950': '#021716',

  'blue.50': '#eff6ff',
  'blue.100': '#dbeafe',
  'blue.200': '#bfdbfe',
  'blue.300': '#a3cfff',
  'blue.400': '#60a5fa',
  'blue.500': '#3b82f6',
  'blue.600': '#2563eb',
  'blue.700': '#173da6',
  'blue.800': '#1a3478',
  'blue.900': '#14204a',
  'blue.950': '#0c142e',

  'cyan.50': '#ecfeff',
  'cyan.100': '#cffafe',
  'cyan.200': '#a5f3fc',
  'cyan.300': '#67e8f9',
  'cyan.400': '#22d3ee',
  'cyan.500': '#06b6d4',
  'cyan.600': '#0891b2',
  'cyan.700': '#0c5c72',
  'cyan.800': '#134152',
  'cyan.900': '#072a38',
  'cyan.950': '#051b24',

  'purple.50': '#faf5ff',
  'purple.100': '#f3e8ff',
  'purple.200': '#e9d5ff',
  'purple.300': '#d8b4fe',
  'purple.400': '#c084fc',
  'purple.500': '#a855f7',
  'purple.600': '#9333ea',
  'purple.700': '#641ba3',
  'purple.800': '#4a1772',
  'purple.900': '#2f0553',
  'purple.950': '#1a032e',

  'pink.50': '#fdf2f8',
  'pink.100': '#fce7f3',
  'pink.200': '#fbcfe8',
  'pink.300': '#f9a8d4',
  'pink.400': '#f472b6',
  'pink.500': '#ec4899',
  'pink.600': '#db2777',
  'pink.700': '#a41752',
  'pink.800': '#6d0e34',
  'pink.900': '#45061f',
  'pink.950': '#2c0514',
} as const;

/** group -> scheme -> token, the shape this data is naturally written in. */
const colorsBySchemeThenToken = {
  primary: {
    light: { bg: colorTokens['gray.950'], fg: colorTokens.white },
    dark: { bg: colorTokens.white, fg: colorTokens['gray.950'] },
  },
  bg: {
    light: {
      default: colorTokens.white,
      subtle: colorTokens['gray.50'],
      muted: colorTokens['gray.100'],
      emphasized: colorTokens['gray.200'],
      inverted: colorTokens['gray.950'],
      panel: colorTokens.white,
      error: colorTokens['red.50'],
      warning: colorTokens['yellow.50'],
      success: colorTokens['green.50'],
      info: colorTokens['blue.50'],
    },
    dark: {
      default: colorTokens['gray.950'],
      subtle: colorTokens['gray.900'],
      muted: colorTokens['gray.800'],
      emphasized: colorTokens['gray.700'],
      inverted: colorTokens.white,
      panel: colorTokens['gray.900'],
      error: colorTokens['red.950'],
      warning: colorTokens['yellow.950'],
      success: colorTokens['green.950'],
      info: colorTokens['blue.950'],
    },
  },
  border: {
    light: {
      default: colorTokens['gray.200'],
      muted: colorTokens['gray.100'],
      subtle: colorTokens['gray.50'],
      emphasized: colorTokens['gray.300'],
      inverted: colorTokens['gray.800'],
      error: colorTokens['red.500'],
      warning: colorTokens['yellow.500'],
      success: colorTokens['green.500'],
      info: colorTokens['blue.500'],
    },
    dark: {
      default: colorTokens['gray.800'],
      muted: colorTokens['gray.900'],
      subtle: colorTokens['gray.950'],
      emphasized: colorTokens['gray.700'],
      inverted: colorTokens['gray.200'],
      error: colorTokens['red.400'],
      warning: colorTokens['yellow.400'],
      success: colorTokens['green.400'],
      info: colorTokens['blue.400'],
    },
  },
  fg: {
    light: {
      default: colorTokens.black,
      muted: colorTokens['gray.600'],
      subtle: colorTokens['gray.400'],
      inverted: colorTokens['gray.50'],
      error: colorTokens['red.500'],
      warning: colorTokens['yellow.600'],
      success: colorTokens['green.600'],
      info: colorTokens['blue.600'],
    },
    dark: {
      default: colorTokens['gray.50'],
      muted: colorTokens['gray.400'],
      subtle: colorTokens['gray.500'],
      inverted: colorTokens['gray.900'],
      error: colorTokens['red.400'],
      warning: colorTokens['yellow.300'],
      success: colorTokens['green.300'],
      info: colorTokens['blue.300'],
    },
  },
  gray: {
    light: {
      contrast: colorTokens.white,
      fg: colorTokens['gray.800'],
      subtle: colorTokens['gray.100'],
      muted: colorTokens['gray.200'],
      emphasized: colorTokens['gray.300'],
      solid: colorTokens['gray.900'],
      focusRing: colorTokens['gray.400'],
      border: colorTokens['gray.200'],
    },
    dark: {
      contrast: colorTokens['gray.950'],
      fg: colorTokens['gray.200'],
      subtle: colorTokens['gray.900'],
      muted: colorTokens['gray.800'],
      emphasized: colorTokens['gray.700'],
      solid: colorTokens.white,
      focusRing: colorTokens['gray.400'],
      border: colorTokens['gray.800'],
    },
  },
  red: {
    light: {
      contrast: colorTokens.white,
      fg: colorTokens['red.700'],
      subtle: colorTokens['red.100'],
      muted: colorTokens['red.200'],
      emphasized: colorTokens['red.300'],
      solid: colorTokens['red.600'],
      focusRing: colorTokens['red.500'],
      border: colorTokens['red.500'],
    },
    dark: {
      contrast: colorTokens.white,
      fg: colorTokens['red.300'],
      subtle: colorTokens['red.900'],
      muted: colorTokens['red.800'],
      emphasized: colorTokens['red.700'],
      solid: colorTokens['red.600'],
      focusRing: colorTokens['red.500'],
      border: colorTokens['red.400'],
    },
  },
  orange: {
    light: {
      contrast: colorTokens.white,
      fg: colorTokens['orange.700'],
      subtle: colorTokens['orange.100'],
      muted: colorTokens['orange.200'],
      emphasized: colorTokens['orange.300'],
      solid: colorTokens['orange.600'],
      focusRing: colorTokens['orange.500'],
      border: colorTokens['orange.500'],
    },
    dark: {
      contrast: colorTokens.black,
      fg: colorTokens['orange.300'],
      subtle: colorTokens['orange.900'],
      muted: colorTokens['orange.800'],
      emphasized: colorTokens['orange.700'],
      solid: colorTokens['orange.500'],
      focusRing: colorTokens['orange.500'],
      border: colorTokens['orange.400'],
    },
  },
  teal: {
    light: {
      contrast: colorTokens.white,
      fg: colorTokens['teal.700'],
      subtle: colorTokens['teal.100'],
      muted: colorTokens['teal.200'],
      emphasized: colorTokens['teal.300'],
      solid: colorTokens['teal.600'],
      focusRing: colorTokens['teal.500'],
      border: colorTokens['teal.500'],
    },
    dark: {
      contrast: colorTokens.white,
      fg: colorTokens['teal.300'],
      subtle: colorTokens['teal.900'],
      muted: colorTokens['teal.800'],
      emphasized: colorTokens['teal.700'],
      solid: colorTokens['teal.600'],
      focusRing: colorTokens['teal.500'],
      border: colorTokens['teal.400'],
    },
  },
  pink: {
    light: {
      contrast: colorTokens.white,
      fg: colorTokens['pink.700'],
      subtle: colorTokens['pink.100'],
      muted: colorTokens['pink.200'],
      emphasized: colorTokens['pink.300'],
      solid: colorTokens['pink.600'],
      focusRing: colorTokens['pink.500'],
      border: colorTokens['pink.500'],
    },
    dark: {
      contrast: colorTokens.white,
      fg: colorTokens['pink.300'],
      subtle: colorTokens['pink.900'],
      muted: colorTokens['pink.800'],
      emphasized: colorTokens['pink.700'],
      solid: colorTokens['pink.600'],
      focusRing: colorTokens['pink.500'],
      border: colorTokens['pink.400'],
    },
  },
  purple: {
    light: {
      contrast: colorTokens.white,
      fg: colorTokens['purple.700'],
      subtle: colorTokens['purple.100'],
      muted: colorTokens['purple.200'],
      emphasized: colorTokens['purple.300'],
      solid: colorTokens['purple.600'],
      focusRing: colorTokens['purple.500'],
      border: colorTokens['purple.500'],
    },
    dark: {
      contrast: colorTokens.white,
      fg: colorTokens['purple.300'],
      subtle: colorTokens['purple.900'],
      muted: colorTokens['purple.800'],
      emphasized: colorTokens['purple.700'],
      solid: colorTokens['purple.600'],
      focusRing: colorTokens['purple.500'],
      border: colorTokens['purple.400'],
    },
  },
  cyan: {
    light: {
      contrast: colorTokens.white,
      fg: colorTokens['cyan.700'],
      subtle: colorTokens['cyan.100'],
      muted: colorTokens['cyan.200'],
      emphasized: colorTokens['cyan.300'],
      solid: colorTokens['cyan.600'],
      focusRing: colorTokens['cyan.500'],
      border: colorTokens['cyan.500'],
    },
    dark: {
      contrast: colorTokens.white,
      fg: colorTokens['cyan.300'],
      subtle: colorTokens['cyan.900'],
      muted: colorTokens['cyan.800'],
      emphasized: colorTokens['cyan.700'],
      solid: colorTokens['cyan.600'],
      focusRing: colorTokens['cyan.500'],
      border: colorTokens['cyan.400'],
    },
  },
  blue: {
    light: {
      contrast: colorTokens.white,
      fg: colorTokens['blue.700'],
      subtle: colorTokens['blue.100'],
      muted: colorTokens['blue.200'],
      emphasized: colorTokens['blue.300'],
      solid: colorTokens['blue.600'],
      focusRing: colorTokens['blue.500'],
      border: colorTokens['blue.500'],
    },
    dark: {
      contrast: colorTokens.white,
      fg: colorTokens['blue.300'],
      subtle: colorTokens['blue.900'],
      muted: colorTokens['blue.800'],
      emphasized: colorTokens['blue.700'],
      solid: colorTokens['blue.600'],
      focusRing: colorTokens['blue.500'],
      border: colorTokens['blue.400'],
    },
  },
  green: {
    light: {
      contrast: colorTokens.white,
      fg: colorTokens['green.700'],
      subtle: colorTokens['green.100'],
      muted: colorTokens['green.200'],
      emphasized: colorTokens['green.300'],
      solid: colorTokens['green.600'],
      focusRing: colorTokens['green.500'],
      border: colorTokens['green.500'],
    },
    dark: {
      contrast: colorTokens.white,
      fg: colorTokens['green.300'],
      subtle: colorTokens['green.900'],
      muted: colorTokens['green.800'],
      emphasized: colorTokens['green.700'],
      solid: colorTokens['green.600'],
      focusRing: colorTokens['green.500'],
      border: colorTokens['green.400'],
    },
  },
  yellow: {
    light: {
      contrast: colorTokens.black,
      fg: colorTokens['yellow.800'],
      subtle: colorTokens['yellow.100'],
      muted: colorTokens['yellow.200'],
      emphasized: colorTokens['yellow.300'],
      solid: colorTokens['yellow.300'],
      focusRing: colorTokens['yellow.500'],
      border: colorTokens['yellow.500'],
    },
    dark: {
      contrast: colorTokens.black,
      fg: colorTokens['yellow.300'],
      subtle: colorTokens['yellow.900'],
      muted: colorTokens['yellow.800'],
      emphasized: colorTokens['yellow.700'],
      solid: colorTokens['yellow.300'],
      focusRing: colorTokens['yellow.500'],
      border: colorTokens['yellow.500'],
    },
  },
} as const;

/** Public shape: group -> scheme -> token — convenient for a `useColor()`-style hook. */
export const colors = colorsBySchemeThenToken;
export type Colors = typeof colors;
export type ColorTokenKey = keyof typeof colorTokens;

type SemanticColors = {
  [Group in keyof Colors]: {
    [Token in keyof Colors[Group]['light'] & keyof Colors[Group]['dark']]: {
      light: Colors[Group]['light'][Token];
      dark: Colors[Group]['dark'][Token];
    };
  };
};

/**
 * `ThemeConfig['semanticTokens']['colors']` wants group -> token -> scheme
 * (so `'fg.default'` resolves in one lookup), the opposite nesting from how
 * this data reads naturally above (group -> scheme -> token). Flipping it
 * here, once, avoids hand-transcribing ~100 leaf values in the inverted
 * order (error-prone) while keeping the source data in its natural shape.
 */
export function invertColorScheme(input: Colors): SemanticColors {
  const result = {} as Record<
    string,
    Record<string, { light: string; dark: string }>
  >;

  for (const group of Object.keys(input) as (keyof Colors)[]) {
    const { light, dark } = input[group];
    const tokens: Record<string, { light: string; dark: string }> = {};

    for (const token of Object.keys(light)) {
      tokens[token] = {
        light: (light as Record<string, string>)[token],
        dark: (dark as Record<string, string>)[token],
      };
    }

    result[group as string] = tokens;
  }

  return result as SemanticColors;
}

export const semanticColors = invertColorScheme(colors);
