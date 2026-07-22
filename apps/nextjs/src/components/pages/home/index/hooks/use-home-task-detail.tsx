import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useTaskDetail } from '@/features/task-detail';
import { useTaskDetailModal } from '@/features/task-detail/components/task-detail-modal';
import type { Params } from '@/lib/nextjs/navigation';

type Props = {
  isTaskDetailURL: (pathname: string, params: Params) => boolean;
  getTaskDetailId: (pathname: string, params: Params) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
};

export const useHomeTaskDetail = (props: Props) => {
  const params = useParams();
  const pathname = usePathname();
  const { setId, setLoading } = useTaskDetail();
  const { onOpen } = useTaskDetailModal();
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;

  useEffect(() => {
    if (!isTaskDetailURL(pathname, params)) return;
    const newId = getTaskDetailId(pathname, params);
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
    getTaskDetailId,
    fetchQuery,
    pathname,
  ]);
};
