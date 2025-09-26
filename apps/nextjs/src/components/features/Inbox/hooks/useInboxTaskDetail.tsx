import {
  useTaskDetail,
  useTaskDetailResetId,
} from '@/components/features/TaskDetail';
import { useTaskDetailSide } from '@/components/features/TaskDetails';
import type { Params } from '@/shared/nextjs/navigation';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  isTaskDetailURL: (params: Params, pathname: string | null) => boolean;
  getTaskDetailId: (params: Params, pathname: string | null) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
};

export const useInboxTaskDetail = (props: Props) => {
  const { setId, setLoading, taskId } = useTaskDetail();
  const { resetId } = useTaskDetailResetId();
  const { onOpen } = useTaskDetailSide();
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      resetId();
    };
  }, [resetId]);

  useEffect(() => {
    if (!isTaskDetailURL(params, pathname)) return;
    const newId = getTaskDetailId(params, pathname);
    if (taskId === newId) return;
    console.log('useInboxTaskDetail!: ', newId);

    setLoading(true);
    setId(newId);
    onOpen(() => {
      setTimeout(async () => {
        await fetchQuery({ taskId: newId });
        setLoading(false);
      }, 200);
    });
  }, [
    params,
    pathname,
    onOpen,
    setLoading,
    setId,
    isTaskDetailURL,
    getTaskDetailId,
    taskId,
    fetchQuery,
  ]);
};
