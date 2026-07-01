import { memo } from 'react';
import { useTaskDetail } from '@/components/features/task-detail';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Stack } from '@/components/ui/stack';
import { useTeammateIdsByTaskId } from '@/store/entities/task-collaborator';
import { useCollaboratorsContext } from '../context';
import { Teammate } from './teammate';

export const Teammates = memo(function Teammates() {
  const { taskId } = useTaskDetail();
  const { teammateIds } = useTeammateIdsByTaskId(taskId);
  const { isInputFocused, onInputFocus } = useCollaboratorsContext();

  if (isInputFocused) return null;

  return (
    <Stack gap={2} direction="row" alignItems="center" ml={4}>
      {teammateIds.map((id) => (
        <Teammate teammateId={id} key={id} />
      ))}
      <IconButton
        aria-label="add collaborators"
        variant="ghost"
        size="sm"
        onClick={onInputFocus}
      >
        <Icon icon="plus" color="fg.muted" />
      </IconButton>
    </Stack>
  );
});
