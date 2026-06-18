import type { PropsWithChildren } from 'react';
import { Flex } from '@/components/ui/flex';
import { Wrap, type WrapProps } from '@/components/ui/wrap';

type Props = WrapProps;

export function CarouselThumbnail({
  children,
  ...props
}: PropsWithChildren<Props>) {
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
        {children}
      </Wrap>
    </Flex>
  );
}
