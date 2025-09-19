import { dueDatePickerCustomStyle } from '@/components/features/organisms/Popovers/PopoverDueDatePicker/dueDatePickerCustomStyle';
import { pdfViewerCustomStyle } from '@/components/ui/organisms/PdfViewer/pdfViewerCustomStyle';
import { proseMirrorStyle } from '@/shared/prosemirror/style';
import { theme as defaultTheme, extendTheme } from '@chakra-ui/react';

// Disabling border for non-keyboard interactions
// @see https://github.com/chakra-ui/chakra-ui/blob/develop/packages/css-reset/README.md
import 'focus-visible/dist/focus-visible';

export const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      '*': {
        WebkitFontSmoothing: 'antialiased',
        fontSmoothing: 'antialiased',
      },
      'html, body': {
        width: '100%',
        height: '100%',
        fontFamily: 'var(--font-roboto)',
        overflow: 'hidden',
        color:
          props.colorMode === 'light'
            ? defaultTheme.colors.gray['700']
            : defaultTheme.colors.whiteAlpha,
      },
      a: {
        _hover: {
          textDecoration: 'none !important',
        },
      },
      ...proseMirrorStyle(),
      ...dueDatePickerCustomStyle(),
      ...pdfViewerCustomStyle(),
    }),
  },

  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: defaultTheme.colors.teal['400'],
    alert: defaultTheme.colors.red['400'],

    text: {
      base: defaultTheme.colors.gray['700'],
      muted: defaultTheme.colors.gray['500'],
    },
    link: defaultTheme.colors.cyan['400'],
    navigation: {
      hover: {
        dark: 'rgba(255,255,255,.08)',
        light: '#e8ecee',
      },
      selected: 'rgba(255,255,255,.16)',
    },
    help: {
      guide: {
        bg: '#f6f8f9',
      },
    },
  },
  components: {
    Switch: {
      baseStyle: {
        track: {
          _focus: {
            boxShadow: 'none',
          },
        },
      },
    },
    Drawer: {
      variants: {
        alwaysOpen: {
          parts: ['dialog, dialogContainer'],
          dialog: {
            pointerEvents: 'auto',
          },
          dialogContainer: {
            pointerEvents: 'none',
          },
        },
      },
    } as any,
  },
});

export const transitions = {
  base: (prop?: string) => `${prop || 'all'} .15s ease-out`,
};
