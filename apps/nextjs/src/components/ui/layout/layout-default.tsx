'use client';

import type { PropsWithChildren } from 'react';
import { memo } from 'react';
import { Navigation } from '@/components/features/Navigation';
import { Flex } from '@/components/ui/flex';

export const LayoutDefault = memo(function LayoutDefault(
  props: PropsWithChildren,
) {
  return (
    <Flex
      w="full"
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
      overflow="hidden"
      {...props}
    >
      <Navigation />
      <Flex flex="1" flexDirection="column" minW="920px">
        <Flex
          as="main"
          flex="1 1 auto"
          flexDirection="column"
          overflowY="scroll"
        >
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  );
});
