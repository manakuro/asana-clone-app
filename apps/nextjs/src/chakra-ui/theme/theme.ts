import { createSystem, defaultConfig } from '@chakra-ui/react';
import { pdfViewerCustomStyle } from '@/components/ui/PdfViewer/pdfViewerCustomStyle';
import { proseMirrorStyle } from '@/shared/prosemirror/style';

export const system = createSystem(defaultConfig, {
  preflight: true,
  globalCss: {
    '*': {
      focusRingStyle: 'none',
      focusRing: 'none',
    },
    'html, body': {
      width: '100%',
      height: '100%',
      fontFamily: 'var(--font-roboto)',
      overflow: 'hidden',
    },
    ...proseMirrorStyle(),
    ...pdfViewerCustomStyle(),
  },
  theme: {
    slotRecipes: {
      dialog: {
        base: {
          content: {
            _closed: { animation: 'none' },
          },
          backdrop: {
            _closed: { animation: 'none' },
          },
        },
        slots: [],
      },
      tabs: {
        base: {
          list: {
            minHeight: '31px',
          },
        },
        variants: {
          size: {
            xs: {
              trigger: {
                fontSize: 'sm',
                py: 1,
              },
            },
          },
        },
        slots: [],
      },
      menu: {
        base: {
          item: {
            cursor: 'pointer',
          },
        },
        slots: [],
      },
    },
    tokens: {
      cursor: {
        checkbox: { value: 'pointer' },
      },
      animations: {
        shimmer: { value: 'shimmer 2s 1' },
      },
    },
    keyframes: {
      'collapse-in': {
        from: {
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        },
        to: {
          height: 'var(--height)',
          opacity: 1,
        },
      },
      'collapse-out': {
        from: {
          height: 'var(--height)',
          opacity: 1,
        },
        to: {
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        },
      },
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          value: '{colors.teal.solid}',
        },
        alert: {
          value: '{colors.fg.error}',
        },
        navigation: {
          hover: {
            dark: {
              value: 'rgba(255,255,255,.08)',
            },
            light: {
              value: '#e8ecee',
            },
          },
          selected: {
            value: 'rgba(255,255,255,.16)',
          },
        },
        help: {
          guide: {
            bg: {
              value: '#f6f8f9',
            },
          },
        },
      },
    },
  },
});

// if (process.env.NODE_ENV === 'development') {
//   console.log(system);
// }
