import { useTaskDetail } from '@/components/features/TaskDetail';
import { useTaskDetailDrawer } from '@/components/features/TaskDetails';
import { useTasksBoardListItemElement } from '@/components/features/Tasks/TasksBoard/TasksBoardListItem';
import type { UseClickOutsideOptionsHasClickedOutside } from '@/hooks';
import { isHTMLElement } from '@/shared/isHTMLElement';
import type { Params } from '@/shared/nextjs/navigation';
import { useParams, usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type Props = {
  isTaskDetailURL: (params: Params, pathname: string | null) => boolean;
  getTaskDetailId: (params: Params, pathname: string | null) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
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
  const { onOpen } = useTaskDetailDrawer();

  useEffect(() => {
    if (!isTaskDetailURL(params, pathname)) return;

    const newId = getTaskDetailId(params, pathname);
    if (taskId === newId) return;
    console.log('render!');

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
    setId,
    taskId,
    setLoading,
    isTaskDetailURL,
    getTaskDetailId,
    fetchQuery,
  ]);

  return {
    hasClickedOutside,
  };
};
