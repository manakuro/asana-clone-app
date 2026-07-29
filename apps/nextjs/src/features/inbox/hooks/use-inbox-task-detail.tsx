import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useTaskDetail, useTaskDetailResetId } from '@/features/task-detail';
import type { Params } from '@/lib/nextjs/navigation';

type Props = {
  isTaskDetailURL: (pathname: string) => boolean;
  getTaskDetailId: (pathname: string, params: Params) => string;
  taskId: string;
};

export const useInboxTaskDetail = (props: Props) => {
  const { setId, taskId } = useTaskDetail();
  const { resetId } = useTaskDetailResetId();
  const { isTaskDetailURL } = props;
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      resetId();
    };
  }, [resetId]);

  useEffect(() => {
    if (!isTaskDetailURL(pathname)) return;
    const newId = props.taskId;
    if (taskId === newId) return;
    console.log('useInboxTaskDetail!: ', newId);

    setId(newId);
  }, [pathname, setId, isTaskDetailURL, taskId, props.taskId]);
};
