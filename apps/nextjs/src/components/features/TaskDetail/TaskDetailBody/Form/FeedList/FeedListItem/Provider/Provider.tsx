import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useTasksRouter } from '@/components/features/Tasks/hooks';
import type { DescriptionFragmentFragment } from '@/graphql/types';
import { useToaster } from '@/hooks/useToaster';
import { parseDescription } from '@/shared/prosemirror/convertDescription';
import { createProvider } from '@/shared/react/createProvider';
import { useTaskFeed, useTaskFeedCommand } from '@/store/entities/taskFeed';
import { useTaskFileIdsByTaskFeedId } from '@/store/entities/taskFile';
import { useTeammate } from '@/store/entities/teammate';
import { Provider as ProviderContainer } from './ProviderContainer';

type Props = {
  taskFeedId: string;
  taskId: string;
  isPinned?: boolean;
};
export function Provider(props: PropsWithChildren<Props>) {
  return (
    <ProviderBase {...props}>
      <ProviderContainer {...props}>{props.children}</ProviderContainer>
    </ProviderBase>
  );
}

const useValue = (props: Props) => {
  const { taskFeed } = useTaskFeed(props.taskFeedId);
  const { taskFileIds } = useTaskFileIdsByTaskFeedId(props.taskFeedId);
  const { teammate } = useTeammate(taskFeed.teammateId);
  const {
    onPin,
    onUnpin,
    onEdit,
    onDelete,
    setIsEdit,
    isEdit,
    showFeedOptionMenu,
    showLike,
    onCopyCommentLink,
  } = useFeedOptionMenu(props);

  const { editable, onCancel, onSave, onChangeDescription, description } =
    useEditor(props, {
      setIsEdit,
      isEdit,
    });

  const hasTaskFile = useMemo(() => !!taskFileIds.length, [taskFileIds]);
  const hasText = useMemo(
    () =>
      !!(taskFeed.description as DescriptionFragmentFragment).content.length,
    [taskFeed.description],
  );
  return {
    taskFeed,
    teammate,
    editable,
    onEdit,
    onDelete,
    onCancel,
    description,
    onChangeDescription,
    onSave,
    showFeedOptionMenu,
    showLike,
    onPin,
    onUnpin,
    onCopyCommentLink,
    isPinned: props.isPinned ?? false,
    hasTaskFile,
    hasText,
    taskId: props.taskId,
    taskFileIds,
  };
};
const { Provider: ProviderBase, useContext: useTaskFeedListItemContext } =
  createProvider(
    useValue,
    '@/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider/Provider.tsx',
  );

const useFeedOptionMenu = (props: Props) => {
  const { getTasksDetailFeedURL } = useTasksRouter();
  const { taskFeed, setTaskFeed } = useTaskFeed(props.taskFeedId);
  const { deleteTaskFeed, undeleteTaskFeed } = useTaskFeedCommand();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { toaster } = useToaster();

  const onPin = useCallback(async () => {
    await setTaskFeed({ isPinned: true });
  }, [setTaskFeed]);

  const onUnpin = useCallback(async () => {
    await setTaskFeed({ isPinned: false });
  }, [setTaskFeed]);

  const onEdit = useCallback(() => setIsEdit(true), []);

  const showFeedOptionMenu = useMemo(
    () => !taskFeed.isFirst,
    [taskFeed.isFirst],
  );
  const showLike = useMemo(() => !taskFeed.isFirst, [taskFeed.isFirst]);

  const onDelete = useCallback(async () => {
    const res = await deleteTaskFeed({ id: taskFeed.id });
    if (!res) return;

    const handleUndo = async () => {
      await undeleteTaskFeed(res);
    };

    toaster.success({
      description: 'The comment was deleted',
      action: {
        label: 'Undo',
        onClick: handleUndo,
      },
      duration: 10000,
    });
  }, [deleteTaskFeed, taskFeed.id, undeleteTaskFeed, toaster.success]);

  const onCopyCommentLink = useCallback(async () => {
    await navigator.clipboard.writeText(
      getTasksDetailFeedURL({ taskId: props.taskId, taskFeedId: taskFeed.id }),
    );
    toaster.success({
      description: 'The comment link was copied to your clipboard.',
    });
  }, [getTasksDetailFeedURL, props.taskId, taskFeed.id, toaster.success]);

  return {
    onPin,
    onUnpin,
    onEdit,
    onDelete,
    showFeedOptionMenu,
    showLike,
    isEdit,
    setIsEdit,
    onCopyCommentLink,
  };
};

const useEditor = (
  props: Props,
  {
    setIsEdit,
    isEdit,
  }: {
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    isEdit: boolean;
  },
) => {
  const { setTaskFeed } = useTaskFeed(props.taskFeedId);
  const [description, setDescription] = useState<string>('');

  const onCancel = useCallback(() => setIsEdit(false), [setIsEdit]);

  const onChangeDescription = useCallback((val: string) => {
    setDescription(val);
  }, []);

  const onSave = useCallback(async () => {
    await setTaskFeed({ description: parseDescription(description) });
    setIsEdit(false);
  }, [description, setTaskFeed, setIsEdit]);

  const editable = useCallback(() => isEdit, [isEdit]);

  return {
    onCancel,
    onSave,
    editable,
    onChangeDescription,
    description,
  };
};

export { useTaskFeedListItemContext };
