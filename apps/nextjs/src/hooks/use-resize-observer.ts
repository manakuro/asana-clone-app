import useLatest from '@react-hook/latest';
import useLayoutEffect from '@react-hook/passive-layout-effect';
import rafSchd from 'raf-schd';
import type React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useResizeObserver = <T extends HTMLElement>(
  target: React.RefObject<T | null> | React.RefObject<T> | T | null,
  callback: UseResizeObserverCallback,
  options?: { skip?: boolean },
): ResizeObserver => {
  const resizeObserver = getResizeObserver();
  const storedCallback = useLatest(callback);

  useLayoutEffect(() => {
    let didUnsubscribe = false;
    const targetEl = target && 'current' in target ? target.current : target;
    if (!targetEl) return;
    if (options?.skip) return;

    resizeObserver.subscribe(
      targetEl,
      (entry: ResizeObserverEntry, observer: ResizeObserver) => {
        if (didUnsubscribe) return;
        storedCallback.current(entry, observer);
      },
    );

    return () => {
      didUnsubscribe = true;
      resizeObserver.unsubscribe(targetEl);
    };
  }, [target, resizeObserver, storedCallback, options?.skip]);

  return resizeObserver.observer;
};

const createResizeObserver = () => {
  const callbacks: Map<any, UseResizeObserverCallback> = new Map();
  const observer = new ResizeObserver(
    rafSchd((entries, observer) => {
      if (entries.length === 1) {
        callbacks.get(entries[0].target)?.(entries[0], observer);
      } else {
        for (let i = 0; i < entries.length; i++) {
          callbacks.get(entries[i].target)?.(entries[i], observer);
        }
      }
    }),
  );

  return {
    observer,
    subscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      observer.observe(target);
      callbacks.set(target, callback);
    },
    unsubscribe(target: HTMLElement) {
      observer.unobserve(target);
      callbacks.delete(target);
    },
  };
};

let resizeObserver: ReturnType<typeof createResizeObserver>;

const getResizeObserver = () => {
  if (!resizeObserver) {
    resizeObserver = createResizeObserver();
  }
  return resizeObserver;
};

export type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: ResizeObserver,
) => any;
