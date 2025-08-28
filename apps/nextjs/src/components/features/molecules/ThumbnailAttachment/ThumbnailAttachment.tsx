import type { FlexProps } from '@/components/ui/atoms';
import { FileTypeCode } from '@/store/entities/fileType';
import { type TaskFile, useTaskFile } from '@/store/entities/taskFile';
import { memo, useCallback } from 'react';
import { File } from './File';
import { Image } from './Image';
import { Provider } from './Provider';

type Props = FlexProps & {
  taskFileId: string;
  onOpenFileViewer: (taskFileId: string) => void;
  onDelete: (taskFile: TaskFile) => void;
};

export const ThumbnailAttachment = memo(function ThumbnailAttachment(
  props: Props,
) {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  );
});

export const Component = memo(function Component(props: Props) {
  const { taskFileId, onOpenFileViewer, onDelete, ...rest } = props;
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
