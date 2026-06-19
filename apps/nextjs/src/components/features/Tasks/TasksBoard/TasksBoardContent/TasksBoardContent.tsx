import { memo, useEffect, useRef, useState } from 'react';
import { useTasksBoardListSectionElement } from '@/components/features/Tasks/TasksBoard/TasksBoardListSection';
import { useTaskDetailDrawer } from '@/components/features/task-details';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useMainStyle, usePrevious } from '@/hooks';
import { useBreakpointValue } from '@/shared/chakra';
import { isHTMLElement } from '@/shared/isHTMLElement';
import { transitions } from '@/styles/transitions';

type Props = FlexProps;

const maxH = 72 + 40;
export const TasksBoardContent = memo(function TasksBoardContent(props: Props) {
  const { maxW } = useMainStyle();
  const { open, taskId } = useTaskDetailDrawer();
  const { getTasksBoardListSectionElementByTaskId } =
    useTasksBoardListSectionElement();
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<FlexProps>();
  const prevIsOpen = usePrevious(open);
  const margin =
    useBreakpointValue({ base: 220, '2xl': 700 }, { fallback: 'base' }) ?? 0;

  useEffect(() => {
    if (!open) {
      setStyle({});
      return;
    }
    const current = ref.current;
    if (prevIsOpen) return;
    if (!isHTMLElement(current)) return;

    const boardListSectionElement =
      getTasksBoardListSectionElementByTaskId(taskId);
    if (!isHTMLElement(boardListSectionElement)) return;

    const left = boardListSectionElement.offsetLeft;

    // Skip scrolling when the first section is clicked
    if (left < 300) return;

    setStyle({ width: '36%', minWidth: 'calc(100% - 670px)' });
    setTimeout(() => {
      current.scrollTo({
        left: left - margin,
        behavior: 'smooth',
      });
    }, 500);
  }, [
    getTasksBoardListSectionElementByTaskId,
    open,
    margin,
    prevIsOpen,
    taskId,
  ]);

  return (
    <Flex
      ref={ref}
      flex={1}
      maxW={maxW}
      overflowX="scroll"
      overflowY="hidden"
      maxH={`calc(100vh - ${maxH}px)`}
      position="relative"
      h="full"
      bg="gray.50"
      transition={transitions.base()}
      {...style}
      {...props}
    >
      <Flex flex={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  );
});
