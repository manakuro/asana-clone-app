import { useParams, usePathname } from 'next/navigation';
import { startTransition, useCallback, useEffect, useRef } from 'react';
import { useTasksListBody } from '@/features/task/components/tasks-list/tasks-list-body/use-tasks-list-body';
import { useTaskDetail } from '@/features/task-detail';
import { useTaskDetailDrawer } from '@/features/task-detail/components/task-detail-drawer';
import type { UseClickOutsideOptionsHasClickedOutside } from '@/hooks/use-click-outside';
import type { Params } from '@/lib/nextjs/navigation';

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
  const { onOpen, open, onClose } = useTaskDetailDrawer();
  const { taskId, setId, setLoading } = useTaskDetail();
  const openRef = useRef<boolean>(false);
  openRef.current = open;

  const taskIdRef = useRef<string | null>(null);
  taskIdRef.current = taskId;

  useEffect(() => {
    if (props.tabContentLoading) return;
    if (!isTaskDetailURL(params, pathname)) {
      onClose();
      return;
    }

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
    onClose,
  ]);

  return {
    hasClickedOutside,
  };
};
