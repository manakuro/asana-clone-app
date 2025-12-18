import { useMemo } from 'react';
import { type ChakraProps, useStyleConfig } from '@/shared/chakra';

type MenuStyle = {
  list: ChakraProps;
  item: Override<
    ChakraProps,
    {
      _focus: {
        bg: ChakraProps['bg'];
      };
    }
  >;
};

export const useMenuStyle = () => {
  const menuStyles = useStyleConfig('Menu') as MenuStyle;

  return useMemo((): MenuStyle => {
    return {
      list: {
        __css: {
          ...menuStyles.list,
        },
      },
      item: {
        __css: {
          ...menuStyles.item,
        },
        display: 'flex',
        flex: 1,
        cursor: 'pointer',
        _hover: {
          bg: 'gray.100',
        },
        _focus: {
          bg: 'gray.100',
        },
      },
    };
  }, [menuStyles]);
};
