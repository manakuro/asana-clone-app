import { memo, useCallback } from 'react';
import { useFileViewerModal } from '@/components/features/Modals';
import { ThumbnailAttachment } from '@/components/features/ThumbnailAttachment';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useToaster } from '@/hooks/useToaster';
import {
  type TaskFile,
  useTaskFileIdsByTaskId,
} from '@/store/entities/taskFile';
import { NewButton } from './NewButton';

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
