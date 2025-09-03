import { useHover } from '@/hooks/useHover';
import { createProvider } from '@/shared/react/createProvider';
import { type TaskFile, useTaskFile } from '@/store/entities/taskFile';
import type React from 'react';
import { useCallback, useState } from 'react';

type ContextProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  isHovering: boolean;
  thumbnailMenuOpened: boolean;
  setThumbnailMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (e: React.MouseEvent<HTMLElement>) => void;
};

type Props = {
  taskFileId: string;
  onDelete: (taskFile: TaskFile) => void;
};

const useValue = (props: Props): ContextProps => {
  const { ref, isHovering } = useHover();
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

export const { Provider, useContext: useThumbnailAttachmentContext } =
  createProvider(
    useValue,
    '@/components/molecules/ThumbnailAttachment/Provider.tsx',
  );
