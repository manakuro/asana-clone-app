import { useParams, usePathname } from 'next/navigation';
import { startTransition, useCallback, useEffect, useRef } from 'react';
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

    onOpen();
    setId(newId);

    let loadingShown = false;
    let cancelled = false;

    const timer = setTimeout(() => {
      if (!cancelled) {
        loadingShown = true;
        setLoading(true);
      }
    }, 500);

    startTransition(async () => {
      await fetchQuery({ taskId: newId });
      clearTimeout(timer);
      if (!cancelled && loadingShown) {
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    fetchQuery,
    getTaskDetailId,
    isTaskDetailURL,
    onOpen,
    params,
    pathname,
    props.tabContentLoading,
    setId,
    setLoading,
  ]);

  return {
    hasClickedOutside,
  };
};
