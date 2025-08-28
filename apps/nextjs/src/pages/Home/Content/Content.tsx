import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { useHomeContentDom, useTasksListContentVerticalScroll } from './hooks';

type Props = FlexProps;

const HEADER_HEIGHT = 72;
export const Content = memo(function Content(props: Props) {
  const { ref } = useHomeContentDom<HTMLDivElement>();

  useTasksListContentVerticalScroll({ listenOnEvent: true });

  return (
    <Flex
      ref={ref}
      maxH={`calc(100vh - ${HEADER_HEIGHT}px)`}
      h={`calc(100vh - ${HEADER_HEIGHT}px)`}
      overflowY="scroll"
    >
      <Flex w="840px" mx="auto" py={10} {...props} justifyContent="center" />
    </Flex>
  );
});
