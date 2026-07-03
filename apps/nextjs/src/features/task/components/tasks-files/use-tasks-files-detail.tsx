import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useTaskDetail } from '@/features/task-detail';
import { useTaskDetailModal } from '@/features/task-detail/components/task-detail-modal';
import type { Params } from '@/lib/nextjs/navigation';

type Props = {
  isTaskDetailURL: (params: Params, pathname: string | null) => boolean;
  getTaskDetailId: (params: Params, pathname: string | null) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
  tabContentLoading: boolean;
};

export const useTasksFilesDetail = (props: Props) => {
  const params = useParams();
  const pathname = usePathname();
  const { setId, setLoading } = useTaskDetail();
  const { onOpen } = useTaskDetailModal();
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;

  useEffect(() => {
    if (props.tabContentLoading) return;
    if (!isTaskDetailURL(params, pathname)) return;
    const newId = getTaskDetailId(params, pathname);
    console.log('useTasksFilesDetail!: ', newId);

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
    fetchQuery,
    props.tabContentLoading,
  ]);
};
