import type { SystemStyleObject } from '@chakra-ui/react';
import type React from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTasksTaskColumn } from '@/components/features/tasks/hooks';
import { TasksListCell } from '@/components/features/tasks/tasks-list/tasks-list-cell';
import { useTasksListHeaderContext } from '@/components/features/tasks/tasks-list/tasks-list-header/provider';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';
import { useHover } from '@/hooks/use-hover';
import { useTaskColumn } from '@/store/entities/task-column';
import { MoreAction } from './more-action';

type Props = {
  tasksTaskColumnId: string;
  isFirst?: boolean;
  clickable?: boolean;
  containerStyle?: SystemStyleObject;
  menu?: boolean;
  onSort?: () => void;
} & FlexProps;

export const Container = memo(function Container(props: Props) {
  const {
    tasksTaskColumnId,
    isFirst,
    clickable,
    containerStyle,
    onSort,
    menu,
    ...rest
  } = props;
  const { tasksTaskColumn, setTasksTaskColumn } =
    useTasksTaskColumn(tasksTaskColumnId);
  const { taskColumn } = useTaskColumn(tasksTaskColumn.taskColumnId);
  const { clickableHoverStyle } = useClickableHoverStyle();
  const { sortedStyle } = useTasksListHeaderContext();
  const minW = useMemo(() => (isFirst ? 400 : 120), [isFirst]);
  const maxW = useMemo(() => (isFirst ? 800 : 280), [isFirst]);
  const style = useMemo(() => {
    return {
      ...(isFirst ? { pl: 0, borderLeft: 'none' } : {}),
      ...(clickable ? { cursor: 'pointer', ...clickableHoverStyle } : {}),
    } as FlexProps;
  }, [clickable, clickableHoverStyle, isFirst]);
  const { ref, isHovering } = useHover<HTMLDivElement>();

  const handleChangeSize = useCallback(
    async (size: string) => {
      await setTasksTaskColumn({ width: size });
    },
    [setTasksTaskColumn],
  );

  const {
    showMoreActionIcon,
    onMoreActionOpened,
    onMoreActionClosed,
    stopPropagation,
  } = useMoreAction({ isHovering });

  return (
    <TasksListCell
      resizable
      resizedMinW={minW}
      resizedMaxW={maxW}
      onChangeSize={handleChangeSize}
      containerStyle={{
        w: tasksTaskColumn.width,
        minW: `${minW}px`,
        maxW: `${maxW}px`,
        ...containerStyle,
      }}
      ref={ref}
      {...style}
      {...sortedStyle}
      {...rest}
    >
      {taskColumn.name}
      {props.children}
      {menu && showMoreActionIcon && (
        <Flex ml="auto" onClick={stopPropagation}>
          <MoreAction
            onOpened={onMoreActionOpened}
            onClosed={onMoreActionClosed}
            onSort={onSort}
            tasksTaskColumnId={tasksTaskColumnId}
          />
        </Flex>
      )}
    </TasksListCell>
  );
});

const useMoreAction = ({ isHovering }: { isHovering: boolean }) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);
  const [isMoreActionOpened, setIsMoreActionOpened] = useState(false);
  const showMoreActionIcon = useMemo<boolean>(() => {
    if (isHovering) return true;
    if (isMoreActionOpened) return true;
    return false;
  }, [isHovering, isMoreActionOpened]);

  const onMoreActionOpened = useCallback(() => {
    setIsMoreActionOpened(true);
  }, []);

  const onMoreActionClosed = useCallback(() => {
    setIsMoreActionOpened(false);
  }, []);

  return {
    stopPropagation,
    showMoreActionIcon,
    onMoreActionOpened,
    onMoreActionClosed,
  };
};
