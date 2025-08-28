import { DueDate, Flex, type FlexProps, Stack } from '@/components/ui/atoms';
import { TaskDoneTransition } from '@/components/ui/molecules';
import { useHover } from '@/hooks/useHover';
import { useRouter } from '@/router';
import { useTask } from '@/store/entities/task';
import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { ActionButton } from './ActionButton';
import { CheckIcon } from './CheckIcon';
import { Feed } from './Feed';
import { Like } from './Like';
import { Row } from './Row';
import { TaskName } from './TaskName';

type Props = FlexProps & {
  taskId: string;
  isFirst?: boolean;
  isLast?: boolean;
};

export const TaskListItem = memo(function TaskListItem(props: Props) {
  const { taskId, isFirst, isLast } = props;
  const { task } = useTask(taskId);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { navigateToInboxDetail } = useRouter();
  const { ref, isHovering } = useHover<HTMLDivElement>();

  const startTransition = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      await navigateToInboxDetail(taskId);
    },
    [navigateToInboxDetail, taskId],
  );

  return (
    <Flex alignItems="center" ref={ref}>
      <Row
        isFirst={isFirst}
        isLast={isLast}
        onClick={handleClick}
        taskId={taskId}
      >
        <TaskDoneTransition isTransitioning={isTransitioning} />
        <CheckIcon
          taskId={taskId}
          isTransitioning={isTransitioning}
          onEndTransition={endTransition}
          onStartTransition={startTransition}
          zIndex={1}
        />
        <TaskName
          taskId={taskId}
          isTransitioning={isTransitioning}
          zIndex={1}
        />
        <Stack direction="row" spacing={1} ml="auto" alignItems="center">
          <DueDate fontSize="xs" dueDate={task.dueDate} />
          <Like taskId={taskId} />
          <Feed taskId={taskId} />
        </Stack>
      </Row>
      <ActionButton
        taskId={taskId}
        ml={3}
        visibility={isHovering ? 'visible' : 'hidden'}
      />
    </Flex>
  );
});
