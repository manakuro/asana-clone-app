import type React from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { transitions } from 'src/styles';

type Props = FlexProps;

export const InboxListHeader: React.FC<Props> = memo((props) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const { ref, entry } = useInView({ threshold: [1] });

  const style = useMemo(
    (): FlexProps => ({
      ...(isScrolling ? { boxShadow: 'sm' } : {}),
    }),
    [isScrolling],
  );

  useEffect(() => {
    setIsScrolling((entry?.intersectionRatio ?? 0) < 1);
  }, [entry?.intersectionRatio]);

  return (
    <Flex
      ref={ref}
      minH="36px"
      maxH="36px"
      fontSize="sm"
      px={6}
      position="sticky"
      top="-1px"
      pt="1px"
      left={0}
      alignItems="center"
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray.200"
      bg="white"
      zIndex="docked"
      transition={transitions.base()}
      {...style}
      {...props}
    >
      {props.children}
    </Flex>
  );
});

InboxListHeader.displayName = 'InboxListHeader';
