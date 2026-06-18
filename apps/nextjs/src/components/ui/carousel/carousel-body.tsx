import type { PropsWithChildren, ReactElement } from 'react';
import { Children, cloneElement, isValidElement, useEffect } from 'react';
import { Flex } from '@/components/ui/flex';
import { useCarouselContext } from './provider';

export function CarouselBody({ children }: PropsWithChildren) {
  const { setCount } = useCarouselContext();
  const count = Children.toArray(children).filter(
    (c) => !!(c as ReactElement).key,
  ).length;

  const elements = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      console.warn('Provide React element under Carousel component');
      return null;
    }

    return cloneElement(child, {
      index,
    } as {
      index?: number;
    });
  });

  useEffect(() => {
    setCount(count);
  }, [count, setCount]);

  return (
    <Flex flex="1" position="relative" height="100%">
      {elements}
    </Flex>
  );
}
