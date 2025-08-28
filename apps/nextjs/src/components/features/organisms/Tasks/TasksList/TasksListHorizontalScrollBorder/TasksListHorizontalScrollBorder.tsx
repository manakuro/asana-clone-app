import { useNavigation } from '@/components/features/organisms/Navigation';
import {
  useTasksListContentHorizontalScroll,
  useTasksListContentSticky,
} from '@/components/features/organisms/Tasks';
import { useTasksTaskColumnByType } from '@/components/features/organisms/Tasks/hooks';
import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMountedRef } from '@/hooks';
import type { ChakraProps } from '@/shared/chakra';
import { TaskColumnType } from '@/store/entities/taskColumn';
import type React from 'react';
import { memo, useEffect, useMemo, useState } from 'react';

type Props = FlexProps;

const TOP = 72 + 60;
export const TasksListHorizontalScrollBorder: React.FC<Props> = memo<Props>(
  (props) => {
    const [opacity, setOpacity] = useState<string>();
    const { isScrolling } = useTasksListContentHorizontalScroll();
    const { isStickyVertical } = useTasksListContentSticky();
    const { tasksTaskColumn } = useTasksTaskColumnByType(
      TaskColumnType.TaskName,
    );
    const { isExpanded } = useNavigation();
    const left = useMemo(() => (isExpanded ? '240px' : '53px'), [isExpanded]);
    const scrollingStyle = useMemo((): ChakraProps => {
      if (isScrolling) return { shadow: 'md' };
      return {};
    }, [isScrolling]);
    const { mountedRef } = useMountedRef();

    // Use setTimeout to prevent border line from flashing  when navigation expands
    useEffect(() => {
      setOpacity('0');
      mountedRef.current = true;

      setTimeout(() => {
        if (mountedRef.current) {
          setOpacity('1');
        }
      }, 100);

      return () => {
        mountedRef.current = false;
      };
    }, [mountedRef.current, mountedRef]);

    if (!isStickyVertical) return null;

    return (
      <Flex
        position="fixed"
        top={`${TOP}px`}
        left={left}
        h="calc(100% + 64px)"
        w={tasksTaskColumn.width}
        zIndex="sticky"
        pointerEvents="none"
        borderRight="1px"
        borderStyle="solid"
        borderColor="gray.200"
        bg="none"
        opacity={opacity}
        {...scrollingStyle}
        {...props}
      />
    );
  },
);
