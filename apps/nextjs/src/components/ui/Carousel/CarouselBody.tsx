import { Flex } from '@/components/ui/atoms';
import React, { type PropsWithChildren, useEffect } from 'react';
import { useCarouselContext } from './Provider';

export function CarouselBody(props: PropsWithChildren) {
  const { setCount } = useCarouselContext();
  const count = React.Children.toArray(props.children).filter(
    (c) => (c as any).type.displayName === 'CarouselItem',
  ).length;

  const children = React.Children.map(props.children, (child, index) => {
    if (!React.isValidElement(child)) {
      console.warn('Provide React element under Carousel component');
      return null;
    }

    return React.cloneElement(child, {
      index,
    });
  });

  useEffect(() => {
    setCount(count);
  }, [count, setCount]);

  return (
    <Flex flex="1" position="relative" height="100%">
      {children}
    </Flex>
  );
}
