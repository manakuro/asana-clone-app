import type React from 'react';
import { memo } from 'react';
import { Navigation } from 'src/components/features/organisms/Navigation';
import { Flex } from 'src/components/ui/atoms';

export const LayoutDefault: React.FCWithChildren = memo((props) => {
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
LayoutDefault.displayName = 'LayoutDefault';
