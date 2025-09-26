import { AttachmentUploadingBox } from '@/components/features/AttachmentUploadingBox';
import { useFileViewerModal } from '@/components/features/Modals';
import { useInputContext } from '@/components/features/TaskDetail/TaskDetailFooter/Comment/Input/Provider';
import { ThumbnailAttachment } from '@/components/features/ThumbnailAttachment';
import { Wrap, WrapItem } from '@/components/ui/Wrap';
import { memo, useCallback } from 'react';

export const Attachments = memo(function Attachments() {
  const { taskFileIds, uploadingFiles, onDeleteTaskFile } = useInputContext();
  const { onOpen, setState } = useFileViewerModal();

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

  if (!taskFileIds.length && !uploadingFiles.length) return null;

  return (
    <Wrap spacing={3} py={2}>
      {taskFileIds.map((id) => (
        <WrapItem key={id}>
          <ThumbnailAttachment
            taskFileId={id}
            onOpenFileViewer={onOpenFileViewer}
            onDelete={onDeleteTaskFile}
          />
        </WrapItem>
      ))}
      {uploadingFiles.map((f, i) => (
        <WrapItem key={`${f.name}-${i}`}>
          <AttachmentUploadingBox file={f} size="md" />
        </WrapItem>
      ))}
    </Wrap>
  );
});
