import type React from 'react';
import { useCallback, useState } from 'react';
import { createContext } from '@/shared/react/create-context';

type ContextProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
};

type Props = {
  onChange?: (currentIndex: number) => void;
  defaultIndex?: number;
};

const useValue = (props: Props): ContextProps => {
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
