import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useTaskDetail, useTaskDetailResetId } from '@/features/task-detail';
import { useTaskDetailSide } from '@/features/task-detail/components/task-detail-side';
import type { Params } from '@/lib/nextjs/navigation';

type Props = {
  isTaskDetailURL: (pathname: string) => boolean;
  getTaskDetailId: (pathname: string, params: Params) => string;
};

export const useInboxTaskDetail = (props: Props) => {
  const { setId, setLoading, taskId } = useTaskDetail();
  const { resetId } = useTaskDetailResetId();
  const { onOpen } = useTaskDetailSide();
  const { isTaskDetailURL, getTaskDetailId } = props;
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      resetId();
    };
  }, [resetId]);

  useEffect(() => {
    if (!isTaskDetailURL(pathname)) return;
    const newId = getTaskDetailId(pathname, params);
    if (taskId === newId) return;
    console.log('useInboxTaskDetail!: ', newId);

    setLoading(true);
    setId(newId);
    onOpen(() => {
      setTimeout(async () => {
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
  ]);
};
