import { useTasksRouter } from '@/components/features/organisms/Tasks/hooks';
import { Flex, Icon, Text } from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules';
import { useClickableHoverStyle } from '@/hooks';
import { useTask } from '@/store/entities/task';
import { memo, useCallback } from 'react';

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
        hasArrow
        label="Parent's notes and comments."
        aria-label="Parent's notes and comments."
        size="sm"
        withIcon
      >
        <>
          <Text
            {...clickableHoverLightStyle}
            textDecoration="underline"
            _hover={{ textDecoration: 'underline !important', opacity: 1 }}
            onClick={handleClick}
          >
            {parentTask.name}
          </Text>
          <Icon icon="chevronRight" color="text.muted" size="sm" mt={1} />
        </>
      </Tooltip>
    </Flex>
  );
});
