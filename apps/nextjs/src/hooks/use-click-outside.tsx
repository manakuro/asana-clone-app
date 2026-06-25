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

// Chakra UI v3 uses data-scope and data-part attributes, along with role attributes
const isContainInMenuList = (e: Event) =>
  Array.from(
    document.querySelectorAll(
      '[role="menu"], [data-scope="menu"][data-part="content"]',
    ),
  ).some((q) => q.contains(e.target as Node));

const isContainInModalContent = (e: Event) =>
  Array.from(
    document.querySelectorAll(
      '[role="dialog"], [data-scope="dialog"][data-part="content"], [data-scope="dialog"][data-part="positioner"]',
    ),
  ).some((q) => q.contains(e.target as Node));

const isContainInPopoverContent = (e: Event) =>
  Array.from(
    document.querySelectorAll(
      '[data-scope="popover"][data-part="content"], [data-scope="hover-card"][data-part="content"]',
    ),
  ).some((q) => q.contains(e.target as Node));

const isContainInToastContent = (e: Event) =>
  Array.from(
    document.querySelectorAll('[data-scope="toast"][data-part="root"]'),
  ).some((q) => q.contains(e.target as Node));

const isContainInPopoverTrigger = (e: Event) =>
  Array.from(
    document.querySelectorAll('[data-scope="popover"][data-part="trigger"]'),
  ).some((q) => q.contains(e.target as Node));
