import type React from 'react';
import { memo, useCallback } from 'react';
import { ThumbnailAttachment } from 'src/components/features/molecules/ThumbnailAttachment';
import { useFileViewerModal } from 'src/components/features/organisms/Modals';
import { Wrap, WrapItem } from 'src/components/ui/atoms';
import { useToast } from 'src/hooks';
import {
  type TaskFile,
  useTaskFileIdsByTaskId,
} from 'src/store/entities/taskFile';
import { NewButton } from './NewButton';

type Props = {
  taskId: string;
};

export const Attachment: React.FC<Props> = memo<Props>((props) => {
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
Attachment.displayName = 'Attachment';
