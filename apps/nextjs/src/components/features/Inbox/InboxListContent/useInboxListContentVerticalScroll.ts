import { isHTMLElement } from '@/shared/isHTMLElement';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { useInboxListContentRef } from './useInboxListContentRef';

const scrollingAtom = atom<boolean>(false);

type Props = {
  listenOnEvent?: boolean;
};
export const useInboxListContentVerticalScroll = (props?: Props) => {
  const { element } = useInboxListContentRef();
  const [isScrolling, setIsScrolling] = useAtom(scrollingAtom);

  const handleScroll = useCallback(
    (event: Event) => {
      if (!isHTMLElement(event.target)) return;
      setIsScrolling(event.target.scrollTop > 0);
    },
    [setIsScrolling],
  );

  useEffect(() => {
    if (!props?.listenOnEvent) return;
    if (!element) return;

    element.addEventListener('scroll', handleScroll);

    return () => element.removeEventListener('scroll', handleScroll);
  }, [handleScroll, props?.listenOnEvent, element]);

  return {
    isScrolling,
  };
};
