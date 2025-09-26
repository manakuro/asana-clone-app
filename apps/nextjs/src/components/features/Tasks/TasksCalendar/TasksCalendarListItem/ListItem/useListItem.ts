import { useTasksRouter } from '@/components/features/Tasks/hooks';
import type React from 'react';
import { useCallback } from 'react';

type Props = {
  taskId: string;
};

export const useListItem = (props: Props) => {
  const { taskId } = props;
  const { navigateToTaskDetail } = useTasksRouter();

  const onOpenTaskDetail = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      await navigateToTaskDetail(taskId);
    },
    [navigateToTaskDetail, taskId],
  );

  return {
    onOpenTaskDetail,
  };
};
