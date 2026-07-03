import { memo, useCallback } from 'react';
import { Wrap, WrapItem } from '@/components/ui/wrap';
import { useFileViewerModal } from '@/features/task/components/file-viewer-modal/use-file-viewer-modal';
import { AttachmentUploadingBox } from '@/features/task-detail/components/attachment-uploading-box';
import { useInputContext } from '@/features/task-detail/components/task-detail-footer/comment/input/context';
import { ThumbnailAttachment } from '@/features/task-detail/components/thumbnail-attachment';

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
    <Wrap gap={3} py={2}>
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
