import { useTaskDetail } from '@/components/features/TaskDetail';
import { useTaskDetailModal } from '@/components/features/TaskDetails';
import type { Params } from '@/shared/nextjs/navigation';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  isTaskDetailURL: (params: Params) => boolean;
  getTaskDetailId: (params: Params) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
};

export const useHomeTaskDetail = (props: Props) => {
  const params = useParams();
  const { setId, setLoading } = useTaskDetail();
  const { onOpen } = useTaskDetailModal();
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;

  useEffect(() => {
    if (!isTaskDetailURL(params)) return;
    const newId = getTaskDetailId(params);
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
  ]);
};
