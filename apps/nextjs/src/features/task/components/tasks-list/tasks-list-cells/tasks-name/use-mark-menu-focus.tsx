import { useCallback, useState } from 'react';

export type UseMarkMenuFocus = {
  markMenuFocused: boolean;
  onMarkMenuOpened: () => void;
  onMarkMenuClosed: () => void;
};
export const useMarkMenuFocus = () => {
  const [focused, setFocused] = useState(false);
  const onMarkMenuOpened = useCallback(() => {
    setFocused(true);
  }, []);
  const onMarkMenuClosed = useCallback(() => {
    setFocused(false);
  }, []);

  return {
    markMenuFocused: focused,
    setMarkMenuFocused: setFocused,
    onMarkMenuOpened,
    onMarkMenuClosed,
  };
};
