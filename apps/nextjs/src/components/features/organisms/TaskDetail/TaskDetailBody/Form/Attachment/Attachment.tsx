import { ThumbnailAttachment } from '@/components/features/molecules/ThumbnailAttachment';
import { useFileViewerModal } from '@/components/features/organisms/Modals';
import { Wrap, WrapItem } from '@/components/ui/atoms';
import { useToast } from '@/hooks';
import {
  type TaskFile,
  useTaskFileIdsByTaskId,
} from '@/store/entities/taskFile';
import { memo, useCallback } from 'react';
import { NewButton } from './NewButton';

type Props = {
  taskId: string;
};

export const Attachment = memo(function Attachment(props: Props) {
  const { taskFileIds } = useTaskFileIdsByTaskId(props.taskId);
  const { onOpen, setState } = useFileViewerModal();
  const { toast } = useToast();

  const onOpenFileViewer = useCallback(
    (taskFileId: string) => {
      setState({
        taskFileIds,
        currentTaskFileId: taskFileId,
      });
      onOpen();
    },
    [taskFileIds, onOpen, setState],
  );

  const onDelete = useCallback(
    (taskFile: TaskFile) => {
      toast({
        description: `${taskFile.name} is deleted from this task`,
      });
    },
    [toast],
  );

  return (
    <Wrap spacing={3}>
      {taskFileIds.map((id) => (
        <WrapItem key={id}>
          <ThumbnailAttachment
            taskFileId={id}
            onOpenFileViewer={onOpenFileViewer}
            onDelete={onDelete}
          />
        </WrapItem>
      ))}
      <NewButton />
    </Wrap>
  );
});
