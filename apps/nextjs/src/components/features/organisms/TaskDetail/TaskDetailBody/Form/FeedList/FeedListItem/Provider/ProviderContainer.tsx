import { useTaskDetailBody } from '@/components/features/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody';
import { useTasksRouter } from '@/components/features/organisms/Tasks/hooks';
import { isHTMLElement } from '@/shared/isHTMLElement';
import { createProvider } from '@/shared/react/createProvider';
import { useTaskFeed } from '@/store/entities/taskFeed';
import { useCallback, useEffect, useRef, useState } from 'react';

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
export const { Provider, useContext: useFeedListItemContainerContext } =
  createProvider(
    useValue,
    '@/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider/ProviderContainer.tsx',
  );
