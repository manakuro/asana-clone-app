import { useResizeObserver } from '@/hooks/useResizeObserver';
import { atom, useAtom } from 'jotai';
import { useTasksListContent } from './useTasksListContent';

const isStickyVerticalAtom = atom<boolean>(false);

type Props = {
  listenOnEvent?: boolean;
};
export const useTasksListContentSticky = (props?: Props) => {
  const { dom } = useTasksListContent();
  const [isStickyVertical, setIsStickyVertical] = useAtom(isStickyVerticalAtom);

  useResizeObserver(
    (dom?.children?.[0] ?? null) as HTMLElement | null,
    (entry) => {
      const listContainerWidth = dom?.getBoundingClientRect().width ?? 0;
      const listContentWidth = entry.contentRect.width;
      setIsStickyVertical(listContentWidth > listContainerWidth);
    },
    {
      skip: !props?.listenOnEvent,
    },
  );

  return {
    isStickyVertical,
  };
};
