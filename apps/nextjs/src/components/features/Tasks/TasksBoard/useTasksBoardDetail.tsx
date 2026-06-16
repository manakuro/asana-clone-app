import { useParams, usePathname } from 'next/navigation';
import { startTransition, useCallback, useEffect, useRef } from 'react';
import { useTaskDetail } from '@/components/features/TaskDetail';
import { useTaskDetailDrawer } from '@/components/features/TaskDetails';
import { useTasksBoardListItemElement } from '@/components/features/Tasks/TasksBoard/TasksBoardListItem';
import type { UseClickOutsideOptionsHasClickedOutside } from '@/hooks';
import { isHTMLElement } from '@/shared/isHTMLElement';
import type { Params } from '@/shared/nextjs/navigation';

type Props = {
  isTaskDetailURL: (params: Params, pathname: string | null) => boolean;
  getTaskDetailId: (params: Params, pathname: string | null) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
  tabContentLoading: boolean;
};

export const useTasksBoardDetail = (props: Props) => {
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;
  const params = useParams();
  const pathname = usePathname();
  const { taskId, setId, setLoading } = useTaskDetail();
  const { className } = useTasksBoardListItemElement();
  const hasClickedOutside =
    useCallback<UseClickOutsideOptionsHasClickedOutside>(
      (e, helpers) => {
        if (helpers.isContainInModalContent(e)) return false;
        if (helpers.isContainInMenuList(e)) return false;
        if (helpers.isContainInToastContent(e)) return false;
        if (helpers.isContainInPopoverContent(e)) return false;
        if (!isHTMLElement(e.target)) return false;
        if (e.target.closest(`.${className}`)) return false;

        return true;
      },
      [className],
    );
  const { onOpen, open } = useTaskDetailDrawer();

  const openRef = useRef<boolean>(false);
  openRef.current = open;

  const taskIdRef = useRef<string | null>(null);
  taskIdRef.current = taskId;

  useEffect(() => {
    if (props.tabContentLoading) return;
    if (!isTaskDetailURL(params, pathname)) return;

    const newId = getTaskDetailId(params, pathname);
    if (openRef.current && taskIdRef.current === newId) return;
    console.log('useTasksBoardDetail!', newId);

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
    params,
    pathname,
    onOpen,
    setId,
    setLoading,
    isTaskDetailURL,
    getTaskDetailId,
    fetchQuery,
    props.tabContentLoading,
  ]);

  return {
    hasClickedOutside,
  };
};
