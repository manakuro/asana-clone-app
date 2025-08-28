import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMainStyle } from '@/hooks';
import { memo } from 'react';
import { useTasksListContent } from './useTasksListContent';
import { useTasksListContentHorizontalScroll } from './useTasksListContentHorizontalScroll';
import { useTasksListContentSticky } from './useTasksListContentSticky';
import { useTasksListContentVerticalScroll } from './useTasksListContentVerticalScroll';

type Props = FlexProps;

const maxH = 72 + 60;
export const TasksListContent = memo(function TasksListContent(props: Props) {
  const { maxW } = useMainStyle();
  const { ref } = useTasksListContent();

  useTasksListContentVerticalScroll({ listenOnEvent: true });
  useTasksListContentSticky({ listenOnEvent: true });
  useTasksListContentHorizontalScroll({ listenOnEvent: true });

  return (
    <Flex
      ref={ref}
      flex={1}
      maxW={maxW}
      overflowX="scroll"
      maxH={`calc(100vh - ${maxH}px)`}
      position="relative"
      h="full"
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  );
});
