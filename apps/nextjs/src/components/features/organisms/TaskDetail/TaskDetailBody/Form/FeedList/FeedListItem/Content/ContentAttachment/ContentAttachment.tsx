import { useFileViewerModal } from '@/components/features/organisms/Modals';
import { FileTypeCode } from '@/graphql/enums';
import { useTaskFile, useTaskFileIdsByTaskId } from '@/store/entities/taskFile';
import { memo, useCallback } from 'react';
import { useTaskFeedListItemContext } from '../../Provider';
import { File } from './File';
import { Image } from './Image';

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
