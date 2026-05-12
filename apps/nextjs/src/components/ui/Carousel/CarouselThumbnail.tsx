import type { PropsWithChildren } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Wrap, type WrapProps } from '@/components/ui/Wrap';

type Props = WrapProps;

export function CarouselThumbnail({
  children,
  ...props
}: PropsWithChildren<Props>) {
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

  return (
    <Flex
      position="absolute"
      bottom="-1px"
      px={{ base: 0, md: 4 }}
      pt={{ base: 6 }}
      pb={{ base: 8 }}
      width="100%"
      alignItems="center"
      justifyContent="center"
      zIndex="tooltip"
      bg="bg.emphasized"
      {...props}
    >
      <Wrap gap={8} alignItems="center" mx="auto">
        {elements}
      </Wrap>
    </Flex>
  );
}
