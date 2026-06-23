import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { TaskDoneTransition } from '@/components/ui/transitions';
import { useHover } from '@/hooks/useHover';
import { useRouter } from '@/router';
import { CheckIcon } from './check-icon';
import { Feed } from './feed';
import { Like } from './like';
import { Row } from './row';
import { TaskName } from './task-name';

type Props = FlexProps & {
  taskId: string;
  isFirst?: boolean;
  isLast?: boolean;
};

export const TaskListItem = memo(function TaskListItem(props: Props) {
  const { taskId, isFirst, isLast } = props;
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
        <Stack
          direction="row"
          gap={1}
          ml="auto"
          alignItems="center"
          visibility={isHovering ? 'visible' : 'hidden'}
        >
          <Like taskId={taskId} />
          <Feed taskId={taskId} />
        </Stack>
      </Row>
    </Flex>
  );
});
