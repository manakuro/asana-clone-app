import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useMainStyle } from '@/hooks';
import { useTasksListContent } from './use-tasks-list-content';
import { useTasksListContentHorizontalScroll } from './use-tasks-list-content-horizontal-scroll';
import { useTasksListContentSticky } from './use-tasks-list-content-sticky';
import { useTasksListContentVerticalScroll } from './use-tasks-list-content-vertical-scroll';

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
