import { useTaskDetail } from '@/components/features/TaskDetail';
import { useTaskDetailDrawer } from '@/components/features/TaskDetails';
import { useTasksListBody } from '@/components/features/Tasks';
import type { UseClickOutsideOptionsHasClickedOutside } from '@/hooks/useClickOutside';
import type { Params } from '@/shared/nextjs/navigation';
import { useParams, usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type Props = {
  isTaskDetailURL: (params: Params, pathname: string | null) => boolean;
  getTaskDetailId: (params: Params, pathname: string | null) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
};

export const useTasksListDetail = (props: Props) => {
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;
  const params = useParams();
  const pathname = usePathname();
  const { getTasksListBodyElement } = useTasksListBody();

  const hasClickedOutside =
    useCallback<UseClickOutsideOptionsHasClickedOutside>(
      (e, helpers): boolean => {
        if (helpers.isContainInModalContent(e)) return false;
        if (helpers.isContainInMenuList(e)) return false;
        if (helpers.isContainInToastContent(e)) return false;
        if (helpers.isContainInPopoverContent(e)) return false;
        if (e.target === getTasksListBodyElement()) return false;
        if (getTasksListBodyElement()?.contains(e.target as Node) ?? false)
          return false;

        return true;
      },
      [getTasksListBodyElement],
    );
  const { onOpen } = useTaskDetailDrawer();
  const { taskId, setId, setLoading } = useTaskDetail();

  useEffect(() => {
    if (!isTaskDetailURL(params, pathname)) return;

    const newId = getTaskDetailId(params, pathname);
    if (taskId === newId) return;
    console.log('useTasksListDetail!: ', newId);

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
    fetchQuery,
    setId,
    taskId,
    setLoading,
    isTaskDetailURL,
    getTaskDetailId,
  ]);

  return {
    hasClickedOutside,
  };
};
