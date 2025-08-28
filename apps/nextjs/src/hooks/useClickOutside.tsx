import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
  skip?: boolean;
  hasClickedOutside?: (
    e: Event,
    helpers: {
      isContainInMenuList: (e: Event) => boolean;
      isContainInModalContent: (e: Event) => boolean;
      isContainInPopoverContent: (e: Event) => boolean;
      isContainInToastContent: (e: Event) => boolean;
      isContainInPopoverTrigger: (e: Event) => boolean;
    },
  ) => boolean;
};
export type UseClickOutsideOptions = Options;
export type UseClickOutsideOptionsHasClickedOutside =
  Required<UseClickOutsideOptions>['hasClickedOutside'];

export const useClickOutside = <T extends HTMLElement>(
  onClickOutside?: () => void,
  options: Options = {},
) => {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState({
    hasClickedOutside: false,
  });
  const { skip, hasClickedOutside } = options;

  const handleEvent = useCallback(
    (e: Event) => {
      if (ref?.current) {
        if (ref.current.contains(e.target as Node)) {
          setState({ hasClickedOutside: false });
        } else {
          // Manually check to see if the element has clicked outside
          if (hasClickedOutside) {
            const clicked = hasClickedOutside(e, {
              isContainInMenuList,
              isContainInModalContent,
              isContainInPopoverContent,
              isContainInToastContent,
              isContainInPopoverTrigger,
            });
            setState({ hasClickedOutside: clicked });
            return;
          }

          setState({ hasClickedOutside: true });
        }
      }
    },
    [hasClickedOutside],
  );

  const removeEventListener = useCallback(() => {
    if (skip) return;

    console.log('Unsubscribe!!');

    if (window.PointerEvent) {
      document.removeEventListener('pointerdown', handleEvent);
    } else {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
    }
  }, [handleEvent, skip]);

  useEffect(() => {
    if (skip) return;

    if (window.PointerEvent) {
      document.addEventListener('pointerdown', handleEvent);
    } else {
      document.addEventListener('mousedown', handleEvent);
      document.addEventListener('touchstart', handleEvent);
    }
    console.log('Subscribe!!');

    return () => {
      removeEventListener();
    };
  }, [handleEvent, skip, removeEventListener]);

  useEffect(() => {
    if (skip) return;

    if (state.hasClickedOutside) {
      onClickOutside?.();
    }
  }, [onClickOutside, state.hasClickedOutside, skip]);

  return {
    ref,
    hasClickedOutside: state.hasClickedOutside,
    removeEventListener,
  };
};

const isContainInMenuList = (e: Event) =>
  Array.from(document.querySelectorAll("[aria-label='menu-list']")).some((q) =>
    q.contains(e.target as Node),
  );
const isContainInModalContent = (e: Event) =>
  Array.from(document.querySelectorAll("[aria-label='modal-content']")).some(
    (q) => q.contains(e.target as Node),
  ) ||
  Array.from(
    document.querySelectorAll('.chakra-modal__content-container'),
  ).some((q) => q.contains(e.target as Node));
const isContainInPopoverContent = (e: Event) =>
  Array.from(document.querySelectorAll("[aria-label='popover-content']")).some(
    (q) => q.contains(e.target as Node),
  );
const isContainInToastContent = (e: Event) =>
  Array.from(document.querySelectorAll("[aria-label='toast-content']")).some(
    (q) => q.contains(e.target as Node),
  );
const isContainInPopoverTrigger = (e: Event) =>
  Array.from(document.querySelectorAll("[aria-label='popover-trigger']")).some(
    (q) => q.contains(e.target as Node),
  );
