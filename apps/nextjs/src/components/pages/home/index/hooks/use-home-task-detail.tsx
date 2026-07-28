import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useTaskDetail } from '@/features/task-detail';
import { useTaskDetailModal } from '@/features/task-detail/components/task-detail-modal';
import type { Params } from '@/lib/nextjs/navigation';

type Props = {
  isTaskDetailURL: (pathname: string, params: Params) => boolean;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
  taskId: string;
};

export const useHomeTaskDetail = (props: Props) => {
  const params = useParams();
  const pathname = usePathname();
  const { setId, setLoading } = useTaskDetail();
  const { onOpen } = useTaskDetailModal();
  const { isTaskDetailURL, fetchQuery, taskId } = props;

  useEffect(() => {
    if (!isTaskDetailURL(pathname, params)) return;
    const newId = taskId;
    console.log('useHomeDetail!: ', newId);

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
    onOpen,
    setLoading,
    setId,
    isTaskDetailURL,
    fetchQuery,
    pathname,
    taskId,
  ]);
};
