import { createProvider } from '@/shared/react/createProvider';
import type React from 'react';
import { useCallback, useState } from 'react';

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
export const { Provider, useContext: useCarouselContext } = createProvider(
  useValue,
  '@/components/organisms/Carousel/Provider.tsx',
);
