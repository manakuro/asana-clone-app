import { useParams, usePathname } from 'next/navigation';
import { startTransition, useCallback, useEffect, useRef } from 'react';
import { useTasksBoardListItemElement } from '@/features/task/components/tasks-board/tasks-board-list-item';
import { useTaskDetail } from '@/features/task-detail';
import { useTaskDetailDrawer } from '@/features/task-detail/components/task-detail-drawer';
import type { UseClickOutsideOptionsHasClickedOutside } from '@/hooks/use-click-outside';
import type { Params } from '@/lib/nextjs/navigation';
import { isHTMLElement } from '@/utils/is-html-element';

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
  const { onOpen, open, onClose } = useTaskDetailDrawer();

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
    onClose,
  ]);

  return {
    hasClickedOutside,
  };
};
