import { Wrap } from '@/components/ui/atoms';
import React, { type PropsWithChildren } from 'react';

export function CarouselThumbnail(props: PropsWithChildren) {
  const children = React.Children.map(props.children, (child, index) => {
    if (!React.isValidElement(child)) {
      console.warn('Provide React element under Carousel component');
      return null;
    }

    return React.cloneElement(child, {
      index,
    });
  });

  return (
    <Wrap
      position="absolute"
      bottom="-1px"
      px={4}
      pt={6}
      pb={8}
      spacing={8}
      justify="center"
      alignItems="center"
      mx="auto"
      w="100%"
      zIndex="tooltip"
      bg="gray.700"
    >
      {children}
    </Wrap>
  );
}
