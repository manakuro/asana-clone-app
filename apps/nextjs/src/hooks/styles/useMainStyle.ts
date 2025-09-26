import { useNavigation } from '@/components/features/Navigation';
import { useEffect, useState } from 'react';

export const useMainStyle = () => {
  const { isExpanded } = useNavigation();
  const [maxW, setMaxW] = useState<string>('');

  useEffect(() => {
    if (isExpanded) {
      setMaxW('calc(100vw - 240px)');
      return;
    }

    setTimeout(() => {
      setMaxW('calc(100vw - 53px)');
    }, 250);
  }, [isExpanded]);

  return {
    paddingX: 6,
    maxW,
  };
};
