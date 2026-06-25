import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@/components/features/navigation';
import { useTasksTaskColumnByType } from '@/components/features/tasks/hooks';
import { useTasksListContentHorizontalScroll } from '@/components/features/tasks/tasks-list/tasks-list-content/use-tasks-list-content-horizontal-scroll';
import { useTasksListContentSticky } from '@/components/features/tasks/tasks-list/tasks-list-content/use-tasks-list-content-sticky';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useMountedRef } from '@/hooks/use-mounted-ref';
import { TaskColumnType } from '@/store/entities/task-column';

type Props = FlexProps;

const TOP = 72 + 60;
export const TasksListHorizontalScrollBorder = memo(
  function TasksListHorizontalScrollBorder(props: Props) {
    const [opacity, setOpacity] = useState<string>();
    const { isScrolling } = useTasksListContentHorizontalScroll();
    const { isStickyVertical } = useTasksListContentSticky();
    const { tasksTaskColumn } = useTasksTaskColumnByType(
      TaskColumnType.TaskName,
    );
    const { isExpanded } = useNavigation();
    const left = useMemo(() => (isExpanded ? '240px' : '53px'), [isExpanded]);
    const scrollingStyle = useMemo((): FlexProps => {
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
        borderColor="border"
        bg="none"
        opacity={opacity}
        {...scrollingStyle}
        {...props}
      />
    );
  },
);
