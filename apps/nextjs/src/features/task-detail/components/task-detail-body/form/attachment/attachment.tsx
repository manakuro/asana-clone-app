import { memo, useCallback } from 'react';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useFileViewerModal } from '@/features/task/components/file-viewer-modal/use-file-viewer-modal';
import {
  type TaskFile,
  useTaskFileIdsByTaskId,
} from '@/features/task/store/task-file';
import { ThumbnailAttachment } from '@/features/task-detail/components/thumbnail-attachment';
import { useToaster } from '@/hooks/use-toaster';
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
