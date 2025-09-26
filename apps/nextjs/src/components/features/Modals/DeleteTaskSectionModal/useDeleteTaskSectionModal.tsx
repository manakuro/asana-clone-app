import {
  useTasksCompletedTaskSizeByTaskSectionId,
  useTasksTaskSection,
  useTasksTaskSectionCommand,
} from '@/components/features/Tasks/hooks';
import { useToast } from '@/hooks';
import { atom, useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback } from 'react';

const openAtom = atom(false);

type ModalState = {
  taskSectionId: string;
};
const modalAtom = atomWithReset<ModalState>({
  taskSectionId: '',
});

export const useDeleteTaskSectionModal = () => {
  const [isOpen, setIsOpen] = useAtom(openAtom);
  const [state, setState] = useAtom(modalAtom);
  const resetState = useResetAtom(modalAtom);
  const { toast } = useToast();
  const {
    deleteTaskSectionAndDeleteTasks,
    deleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndKeepTasks,
    undeleteTaskSectionAndDeleteTasks,
  } = useTasksTaskSectionCommand();
  const { completedTaskSize, incompleteTaskSize, taskSize } =
    useTasksCompletedTaskSizeByTaskSectionId(state.taskSectionId);
  const { taskSection } = useTasksTaskSection(state.taskSectionId);

  const onClose = useCallback(() => {
    setIsOpen(false);
    resetState();
  }, [setIsOpen, resetState]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const setModalState = useCallback(
    (val: ModalState) => {
      setState(val);
    },
    [setState],
  );

  const onDeleteAndKeepTask = useCallback(async () => {
    setIsOpen(false);
    const res = await deleteTaskSectionAndKeepTasks(state.taskSectionId);
    if (!res) return;

    toast({
      description: `${taskSection.name} was deleted and its tasks are being moved.`,
      undo: async () => {
        await undeleteTaskSectionAndKeepTasks(res);
      },
      duration: 10000,
    });
    resetState();
  }, [
    setIsOpen,
    deleteTaskSectionAndKeepTasks,
    state.taskSectionId,
    toast,
    taskSection.name,
    resetState,
    undeleteTaskSectionAndKeepTasks,
  ]);

  const onDeleteAndDeleteTask = useCallback(async () => {
    setIsOpen(false);
    const res = await deleteTaskSectionAndDeleteTasks(state.taskSectionId);
    if (!res) return;

    toast({
      description: `${taskSection.name} was deleted and its tasks are being deleted.`,
      undo: async () => {
        await undeleteTaskSectionAndDeleteTasks(res);
      },
      duration: 10000,
    });
    resetState();
  }, [
    deleteTaskSectionAndDeleteTasks,
    resetState,
    setIsOpen,
    state.taskSectionId,
    taskSection.name,
    toast,
    undeleteTaskSectionAndDeleteTasks,
  ]);

  return {
    isOpen,
    onClose,
    onOpen,
    setModalState,
    taskSection,
    onDeleteAndKeepTask,
    onDeleteAndDeleteTask,
    incompleteTaskSize,
    completedTaskSize,
    taskSize,
    ...state,
  };
};
