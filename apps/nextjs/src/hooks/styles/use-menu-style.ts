import { useSlotRecipe } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { SystemStyleObject } from '@/shared/chakra';

type MenuStyle = {
  content: SystemStyleObject;
  item: SystemStyleObject;
};

export const useMenuStyle = () => {
  const recipe = useSlotRecipe({ key: 'menu' });

  return useMemo((): MenuStyle => {
    return {
      content: recipe().content,
      item: {
        ...recipe().item,
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
  }, [recipe]);
};
