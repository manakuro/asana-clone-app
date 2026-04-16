import { useSlotRecipe } from '@chakra-ui/react';
import { useMemo } from 'react';

export const useDrawerStyle = () => {
  const recipe = useSlotRecipe({ key: 'drawer' });

  return {
    drawerStyle: useMemo(() => recipe(), [recipe]),
  };
};
