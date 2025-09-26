import { isHTMLElement } from '@/shared/isHTMLElement';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { useHomeContentDom } from './useHomeContentDom';

const scrollAtom = atom<boolean>(false);

type Props = {
  listenOnEvent?: boolean;
};
export const useTasksListContentVerticalScroll = (props?: Props) => {
  const { dom } = useHomeContentDom();
  const [isScrolling, setIsScrolling] = useAtom(scrollAtom);

  const handleScroll = useCallback(
    (event: Event) => {
      if (!isHTMLElement(event.target)) return;
      setIsScrolling(event.target.scrollTop > 0);
    },
    [setIsScrolling],
  );

  useEffect(() => {
    if (!props?.listenOnEvent) return;
    if (!dom) return;

    dom.addEventListener('scroll', handleScroll);

    return () => dom.removeEventListener('scroll', handleScroll);
  }, [handleScroll, props?.listenOnEvent, dom]);

  return {
    isScrolling,
  };
};
