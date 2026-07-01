import { useCallback, useEffect, useRef, useState } from 'react';
import { useTaskDetailBody } from '@/components/features/task-detail/components/task-detail-body/use-task-detail-body';
import { useTasksRouter } from '@/components/features/tasks/hooks';
import { isHTMLElement } from '@/shared/is-html-element';
import { createContext } from '@/shared/react/create-context';
import { useTaskFeed } from '@/store/entities/task-feed';

type Props = {
  taskFeedId: string;
  isPinned?: boolean;
};
const useValue = (props: Props) => {
  const { getTasksDetailFeedId } = useTasksRouter();
  const { taskFeed } = useTaskFeed(props.taskFeedId);
  const ref = useRef<HTMLElement | null>(null);
  const { taskDetailBodyDom } = useTaskDetailBody();
  const [isReferenced, setIsReferenced] = useState<boolean>(false);

  const setReference = useCallback(() => {
    setIsReferenced(true);
    setTimeout(() => {
      setIsReferenced(false);
    }, 3000);
  }, []);

  const scrollToFeedItem = useCallback(() => {
    const dom = ref.current;
    if (!isHTMLElement(dom)) return;
    if (!isHTMLElement(taskDetailBodyDom)) return;

    setReference();
    const rect = dom.getBoundingClientRect();
    setTimeout(() => {
      taskDetailBodyDom.scrollTo({ top: rect.top, behavior: 'smooth' });
    }, 500);
  }, [setReference, taskDetailBodyDom]);

  useEffect(() => {
    const id = getTasksDetailFeedId();
    if (!id) return;
    if (props.isPinned) return;
    if (id !== taskFeed.id) return;

    scrollToFeedItem();
  }, [taskFeed.id, props.isPinned, scrollToFeedItem, getTasksDetailFeedId]);

  return {
    containerRef: ref,
    isReferenced,
  };
};
export const { Context, useContext: useFeedListItemContainerContext } =
  createContext(
    useValue,
    '@/components/features/task-detail/task-detail-body/form/feed-list/feed-list-item/provider/context-container.tsx',
  );
