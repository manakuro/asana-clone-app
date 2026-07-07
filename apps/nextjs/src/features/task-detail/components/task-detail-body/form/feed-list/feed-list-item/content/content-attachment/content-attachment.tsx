import { memo, useCallback } from 'react';
import { useFileViewerModal } from '@/features/task/components/file-viewer-modal/use-file-viewer-modal';
import {
  useTaskFile,
  useTaskFileIdsByTaskId,
} from '@/features/task/store/task-file';
import { FileTypeCode } from '@/graphql/enums';
import { useTaskFeedListItemContext } from '../../provider';
import { File } from './file';
import { Image } from './image';

type Props = {
  taskFileId: string;
};

export const ContentAttachment = memo(function ContentAttachment(props: Props) {
  const { taskId } = useTaskFeedListItemContext();
  const { taskFile } = useTaskFile(props.taskFileId);
  const { taskFileIds } = useTaskFileIdsByTaskId(taskId);
  const { onOpen, setState } = useFileViewerModal();

  const handleOpenFileViewer = useCallback(() => {
    setState({
      taskFileIds,
      currentTaskFileId: taskFile.id,
    });
    onOpen();
  }, [taskFile.id, taskFileIds, onOpen, setState]);

  switch (taskFile.fileType.typeCode) {
    case FileTypeCode.Image:
      return (
        <Image taskFileId={props.taskFileId} onClick={handleOpenFileViewer} />
      );
    default:
      return (
        <File taskFileId={props.taskFileId} onClick={handleOpenFileViewer} />
      );
  }
});
