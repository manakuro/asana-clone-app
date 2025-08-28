import { TeammateAvatar } from '@/components/features/organisms/TeammateAvatar';
import { Flex, Text } from '@/components/ui/atoms';
import { useTask, useTaskCommand } from '@/store/entities/task';
import { type Teammate, useTeammate } from '@/store/entities/teammate';
import { memo, useCallback, useMemo } from 'react';
import { DeleteButton } from './DeleteButton';
import { Input } from './Input';

type Props = {
  taskId: string;
  isHovering: boolean;
  focused: boolean;
  onUnfocus: () => void;
};

export const Content = memo(function Content(props: Props) {
  const { isHovering, focused, onUnfocus, taskId } = props;
  const { task } = useTask(taskId);
  const { assignTask } = useTaskCommand();
  const { teammate } = useTeammate(task.assigneeId);
  const hasAssigned = useMemo(() => !!task.assigneeId, [task.assigneeId]);
  const showIcon = useMemo(
    () => !hasAssigned && isHovering,
    [hasAssigned, isHovering],
  );
  const showResetIcon = useMemo(
    () => hasAssigned && isHovering,
    [hasAssigned, isHovering],
  );

  const handleSelect = useCallback(
    async (val: Teammate) => {
      await assignTask({ id: taskId, assigneeId: val.id });
    },
    [assignTask, taskId],
  );

  if (focused) {
    return <Input onClose={onUnfocus} onSelect={handleSelect} />;
  }

  if (showIcon) {
    return <TeammateAvatar teammateId="" bg="gray.200" size="xs" />;
  }

  if (hasAssigned) {
    return (
      <>
        <Flex alignItems="center" maxW="inherit">
          <TeammateAvatar teammateId={task.assigneeId} size="xs" />
          <Text fontSize="xs" ml={1} noOfLines={1}>
            {teammate.name}
          </Text>
        </Flex>
        {showResetIcon && <DeleteButton taskId={taskId} />}
      </>
    );
  }

  return null;
});
