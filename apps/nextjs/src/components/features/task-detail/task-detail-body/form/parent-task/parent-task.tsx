import { memo, useCallback } from 'react';
import { useTasksRouter } from '@/components/features/Tasks/hooks';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { useClickableHoverStyle } from '@/hooks';
import { useTask } from '@/store/entities/task';

type Props = {
  taskId: string;
};

export const ParentTask = memo(function ParentTask(props: Props) {
  const { isSubtask, task } = useTask(props.taskId);
  const { task: parentTask } = useTask(task.taskParentId);
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { navigateToTaskDetail } = useTasksRouter();

  const handleClick = useCallback(async () => {
    await navigateToTaskDetail(parentTask.id);
  }, [navigateToTaskDetail, parentTask.id]);

  if (!isSubtask) return null;

  return (
    <Flex px={6} my={4} alignItems="center">
      <Tooltip
        showArrow
        content="Parent's notes and comments."
        aria-label="Parent's notes and comments."
        size="sm"
        withIcon
      >
        <Text
          css={clickableHoverLightStyle}
          textDecoration="underline"
          _hover={{ textDecoration: 'underline !important', opacity: 1 }}
          onClick={handleClick}
        >
          {parentTask.name}
        </Text>
        <Icon icon="chevronRight" color="fg.muted" size="sm" mt={1} />
      </Tooltip>
    </Flex>
  );
});
