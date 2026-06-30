import { useCallback, useState } from 'react';
import { createContext } from '@/shared/react/create-context';

type Props = {
  onChange?: (currentIndex: number) => void;
  defaultIndex?: number;
};

const useValue = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(
    props.defaultIndex ?? 0,
  );
  const [count, setCount] = useState<number>(0);

  const handleSetCurrentIndex = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      props.onChange?.(index);
    },
    [props],
  );

  return {
    count,
    setCount,
    currentIndex,
    setCurrentIndex: handleSetCurrentIndex,
  };
};
export const { Context, useContext: useCarouselContext } = createContext(
  useValue,
  '@/components/ui/carousel/context.tsx',
);
