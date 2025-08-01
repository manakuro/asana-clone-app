import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { Icon, IconButton, Stack } from '@/components/ui/atoms';
import { useTeammateIdsByTaskId } from '@/store/entities/taskCollaborator';
import { memo } from 'react';
import { useCollaboratorsContext } from '../Provider';
import { Teammate } from './Teammate';

export const Teammates = memo(function Teammates() {
  const { taskId } = useTaskDetail();
  const { teammateIds } = useTeammateIdsByTaskId(taskId);
  const { isInputFocused, onInputFocus } = useCollaboratorsContext();

  if (isInputFocused) return null;

  return (
    <Stack spacing={2} direction="row" alignItems="center" ml={4}>
      {teammateIds.map((id) => (
        <Teammate teammateId={id} key={id} />
      ))}
      <IconButton
        aria-label="add collaborators"
        icon={<Icon icon="plus" color="text.muted" />}
        variant="ghost"
        size="sm"
        onClick={onInputFocus}
      />
    </Stack>
  );
});
