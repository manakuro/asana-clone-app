import { memo, useCallback } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { FileTypeCode } from '@/features/task/store/file-type';
import { type TaskFile, useTaskFile } from '@/features/task/store/task-file';
import { Context } from './context';
import { File } from './file';
import { Image } from './image';

type Props = FlexProps & {
  taskFileId: string;
  onOpenFileViewer: (taskFileId: string) => void;
  onDelete: (taskFile: TaskFile) => void;
};

export const ThumbnailAttachment = memo(function ThumbnailAttachment(
  props: Props,
) {
  return (
    <Context {...props}>
      <Component {...props} />
    </Context>
  );
});

export const Component = memo(function Component(props: Props) {
  const { taskFileId, onOpenFileViewer, onDelete: _, ...rest } = props;
  const { taskFile } = useTaskFile(taskFileId);

  const handleClick = useCallback(() => {
    onOpenFileViewer(taskFileId);
  }, [taskFileId, onOpenFileViewer]);

  switch (taskFile.fileType.typeCode) {
    case FileTypeCode.Image: {
      return <Image onClick={handleClick} taskFileId={taskFileId} {...rest} />;
    }
    case FileTypeCode.Pdf:
    case FileTypeCode.Text: {
      return <File onClick={handleClick} taskFileId={taskFileId} {...rest} />;
    }
  }
});
