import { useParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { useTaskDetail } from '@/components/features/TaskDetail';
import { useTaskDetailDrawer } from '@/components/features/TaskDetails';
import { useTasksListBody } from '@/components/features/Tasks';
import type { UseClickOutsideOptionsHasClickedOutside } from '@/hooks/useClickOutside';
import type { Params } from '@/shared/nextjs/navigation';

type Props = {
  isTaskDetailURL: (params: Params, pathname: string | null) => boolean;
  getTaskDetailId: (params: Params, pathname: string | null) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
  tabContentLoading: boolean;
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
  const { onOpen, open } = useTaskDetailDrawer();
  const { taskId, setId, setLoading } = useTaskDetail();
  const openRef = useRef<boolean>(false);
  openRef.current = open;

  const taskIdRef = useRef<string | null>(null);
  taskIdRef.current = taskId;

  useEffect(() => {
    if (props.tabContentLoading) return;
    if (!isTaskDetailURL(params, pathname)) return;

    const newId = getTaskDetailId(params, pathname);
    if (openRef.current && taskIdRef.current === newId) return;
    console.log('useTasksListDetail!: ', newId);

    setLoading(true);
    onOpen(() => {
      setTimeout(async () => {
        setId(newId);
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
    setLoading,
    isTaskDetailURL,
    getTaskDetailId,
    props.tabContentLoading,
  ]);

  return {
    hasClickedOutside,
  };
};
