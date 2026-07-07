import type React from 'react';
import { useCallback, useState } from 'react';
import { type TaskFile, useTaskFile } from '@/features/task/store/task-file';
import { useHover } from '@/hooks/use-hover';
import { createContext } from '@/lib/react/create-context';

type Props = {
  taskFileId: string;
  onDelete: (taskFile: TaskFile) => void;
};

const useValue = (props: Props) => {
  const { ref, isHovering } = useHover<HTMLDivElement>();
  const [thumbnailMenuOpened, setThumbnailMenuOpened] =
    useState<boolean>(false);
  const { taskFile } = useTaskFile(props.taskFileId);

  const onDelete = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      props.onDelete(taskFile);
    },
    [taskFile, props],
  );

  return {
    ref,
    isHovering,
    thumbnailMenuOpened,
    setThumbnailMenuOpened,
    onDelete,
  };
};

export const { Context, useContext: useThumbnailAttachmentContext } =
  createContext(
    useValue,
    '@/components/features/thumbnail-attachment/context.tsx',
  );
