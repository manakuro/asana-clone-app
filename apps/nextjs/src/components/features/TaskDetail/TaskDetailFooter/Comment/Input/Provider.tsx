import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import {
  useTaskDetail,
  useTaskDetailBody,
} from '@/components/features/TaskDetail';
import type { FileUploaderParams, UploadedFile } from '@/components/ui/form';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useToaster } from '@/hooks/useToaster';
import { getScrollBottom } from '@/shared/getScrollBottom';
import { parseDescription } from '@/shared/prosemirror/convertDescription';
import { createProvider } from '@/shared/react/createProvider';
import { useMe } from '@/store/entities/me';
import { useTaskFeed, useTaskFeedCommand } from '@/store/entities/taskFeed';
import {
  getTaskFileTypeFromFile,
  initialState,
  type TaskFile,
  useTaskFileCommand,
} from '@/store/entities/taskFile';

const useValue = () => {
  const { focused, setFocused, onFocus, ref } = useFocus();
  const [taskFeedId, setFeedId] = useState<string>('');
  const { taskFeed } = useTaskFeed(taskFeedId);
  const {
    hasTaskFile,
    setTaskFileIds,
    taskFileIds,
    onDeleteTaskFile,
    resetTaskFileIds,
  } = useTaskFile();
  const { uploadingFiles, onUploadFile } = useUploadingFile({
    setTaskFileIds,
  });
  const { onSave, onChangeDescription } = useSave({
    onSaved: (id: string) => {
      setFeedId(id);
      setFocused(false);
      resetTaskFileIds();
    },
  });

  return {
    focused,
    onFocus,
    ref,
    onSave,
    onChangeDescription,
    taskFeed,
    onUploadFile,
    taskFileIds,
    uploadingFiles,
    hasTaskFile,
    onDeleteTaskFile,
  };
};
export const { Provider, useContext: useInputContext } = createProvider(
  useValue,
  '@/components/organisms/TaskDetail/TaskDetailFooter/Comment/Input/Provider.tsx',
);

const useTaskFile = () => {
  const [taskFileIds, setTaskFileIds] = useState<string[]>([]);
  const { toaster } = useToaster();

  const hasTaskFile = useMemo(() => !!taskFileIds.length, [taskFileIds]);

  const onDelete = useCallback(
    (taskFile: TaskFile) => {
      setTaskFileIds((prev) => prev.filter((p) => p !== taskFile.id));
      toaster.success({
        description: `${taskFile.name} is deleted from this task`,
      });
    },
    [toaster.success],
  );

  const resetTaskFileIds = useCallback(() => {
    setTaskFileIds([]);
  }, []);

  return {
    taskFileIds,
    setTaskFileIds,
    resetTaskFileIds,
    hasTaskFile,
    onDeleteTaskFile: onDelete,
  };
};

const useUploadingFile = (props: {
  setTaskFileIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { taskId } = useTaskDetail();
  const { addTaskFile } = useTaskFileCommand();
  const [uploadingFiles, setUploadingFiles] = useState<
    { name: string; num: number }[]
  >([]);

  const upsertUploadingFile = useCallback(
    (file: UploadedFile, num?: number) => {
      setUploadingFiles((prev) => {
        const uploadingFile = prev.find((p) => p.name === file.name) || {
          name: file.name,
          num: 0,
        };

        const index = prev.findIndex((p) => p.name === uploadingFile.name);
        const newValue = {
          ...uploadingFile,
          num: num ?? (uploadingFile.num === 80 ? 80 : uploadingFile.num + 20),
        };
        if (index === -1) return [...prev, newValue];

        return [...prev.slice(0, index), newValue, ...prev.slice(index + 1)];
      });
    },
    [],
  );

  const removeUploadingFile = useCallback((file: UploadedFile) => {
    setUploadingFiles((prev) => {
      const uploadingFile = prev.find((p) => p.name === file.name);
      const index = prev.findIndex((prev) => prev.name === uploadingFile?.name);
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }, []);

  const onUploadFile = useCallback(
    async (files: FileUploaderParams) => {
      const promises: Promise<{
        createdTaskFileId: string;
      }>[] = files.map(async (f) => {
        const file = await f;

        upsertUploadingFile(file);

        return new Promise((resolve) => {
          const timeout = setInterval(() => {
            upsertUploadingFile(file);
          }, 3000);

          setTimeout(() => {
            const createdTaskFileId = addTaskFile({
              taskId,
              src: file.data,
              name: file.name,
              fileType: {
                ...initialState().fileType,
                typeCode: getTaskFileTypeFromFile(file.type),
              },
            });

            upsertUploadingFile(file, 100);

            setTimeout(() => {
              removeUploadingFile(file);
              clearInterval(timeout);

              resolve({
                createdTaskFileId,
              });
            }, 500);
          }, 2000);
        });
      });

      const result = await Promise.all(promises);
      props.setTaskFileIds((prev) => [
        ...prev,
        ...result.map((r) => r.createdTaskFileId),
      ]);
      setUploadingFiles([]);
    },
    [addTaskFile, props, removeUploadingFile, taskId, upsertUploadingFile],
  );

  return {
    uploadingFiles,
    onUploadFile,
  };
};

const useFocus = () => {
  const [focused, setFocused] = useState(false);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const { ref } = useClickOutside<HTMLDivElement>(
    () => {
      setFocused(false);
    },
    {
      hasClickedOutside: (e, helpers) => {
        if (helpers.isContainInPopoverContent(e)) return false;
        if (helpers.isContainInMenuList(e)) return false;
        if (helpers.isContainInModalContent(e)) return false;
        return true;
      },
    },
  );

  return {
    focused,
    setFocused,
    onFocus,
    ref,
  };
};

const useSave = (props: { onSaved: (id: string) => void }) => {
  const { taskId } = useTaskDetail();
  const { addTaskFeed } = useTaskFeedCommand();
  const { me } = useMe();
  const { taskDetailBodyDom } = useTaskDetailBody();
  const [description, setDescription] = useState<string>('');

  const scrollToBottom = useCallback(() => {
    if (!taskDetailBodyDom) return;
    taskDetailBodyDom.scrollTop = getScrollBottom(taskDetailBodyDom);
  }, [taskDetailBodyDom]);

  const onSave = useCallback(() => {
    const id = addTaskFeed({
      taskId,
      description: parseDescription(description),
      teammateId: me.id,
    });
    props.onSaved(id);
    scrollToBottom();
  }, [addTaskFeed, description, me.id, props, scrollToBottom, taskId]);

  const onChangeDescription = useCallback((val: string) => {
    setDescription(val);
  }, []);

  return {
    onSave,
    onChangeDescription,
  };
};
