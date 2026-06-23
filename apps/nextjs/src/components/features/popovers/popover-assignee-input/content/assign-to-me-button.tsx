import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useMe } from '@/store/entities/me';
import { useTaskCommand } from '@/store/entities/task';

type Props = {
  taskId: string;
  onClose: () => void;
};

export function AssignToMeButton(props: Props) {
  const { onClose, taskId } = props;
  const { assignTask } = useTaskCommand();
  const { me } = useMe();

  const handleAssignMe = useCallback(async () => {
    onClose();
    await assignTask({ id: taskId, assigneeId: me.id });
  }, [assignTask, me.id, onClose, taskId]);

  return (
    <Button size="sm" variant="outline" onClick={handleAssignMe}>
      Assign to me
    </Button>
  );
}
