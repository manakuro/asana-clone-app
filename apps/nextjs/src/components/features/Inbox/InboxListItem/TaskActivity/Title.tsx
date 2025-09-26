import { useTaskActivityTaskIds } from '@/components/features/Inbox/hooks';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { formatDueDate } from '@/shared/date';
import { useTask } from '@/store/entities/task';
import { transitions } from '@/styles';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';

type Props = FlexProps & {
  taskActivityId: string;
};

export const Title = memo<Props>(function Title(props) {
  const { taskActivityId } = props;
  const { taskIds } = useTaskActivityTaskIds(taskActivityId);
  const { task } = useTask(taskIds[0]);
  const text = useMemo(
    () => `Your tasks for ${formatDueDate(task.dueDate)}`,
    [task.dueDate],
  );

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <Flex flex={1} mt={1}>
      <Flex alignItems="center">
        <Icon icon="calendarAlt" color="text.muted" />
        <Link
          mt="2px"
          fontSize="md"
          fontWeight="medium"
          ml={2}
          transition={transitions.base()}
          hover
          onClick={handleClick}
        >
          {text}
        </Link>
      </Flex>
    </Flex>
  );
});
