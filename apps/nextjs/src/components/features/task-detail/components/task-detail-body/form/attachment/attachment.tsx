import { memo, useCallback } from 'react';
import { ThumbnailAttachment } from '@/components/features/task-detail/components/thumbnail-attachment';
import { useFileViewerModal } from '@/components/features/tasks/components/file-viewer-modal/use-file-viewer-modal';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useToaster } from '@/hooks/use-toaster';
import {
  type TaskFile,
  useTaskFileIdsByTaskId,
} from '@/store/entities/task-file';
import { NewButton } from './new-button';

type Props = {
  taskId: string;
};

export const Attachment = memo(function Attachment(props: Props) {
  const { taskFileIds } = useTaskFileIdsByTaskId(props.taskId);
  const { onOpen, setState } = useFileViewerModal();
  const { toaster } = useToaster();

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
      toaster.success({
        description: `${taskFile.name} is deleted from this task`,
      });
    },
    [toaster.success],
  );

  return (
    <Wrap gap={3}>
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
