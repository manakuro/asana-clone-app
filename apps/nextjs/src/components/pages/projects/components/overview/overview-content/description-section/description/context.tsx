import { useCallback, useState } from 'react';
import {
  type UseClickOutsideOptionsHasClickedOutside,
  useClickOutside,
} from '@/hooks/use-click-outside';
import { createContext } from '@/shared/react/create-context';

const useValue = () => {
  const [focused, setFocused] = useState(false);

  const hasClickedOutside =
    useCallback<UseClickOutsideOptionsHasClickedOutside>((e, helpers) => {
      // To avoid disappearing emoji picker
      // @see src/components/organisms/Popovers/PopoverEmoji/Content.tsx
      if (helpers.isContainInPopoverContent(e)) return false;

      return true;
    }, []);

  const { ref } = useClickOutside<HTMLDivElement>(
    () => {
      setFocused(false);
    },
    {
      hasClickedOutside,
    },
  );

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  return {
    focused,
    onFocus,
    ref,
  };
};
export const { Context, useContext: useDescriptionContext } = createContext(
  useValue,
  '@/components/pages/projects/components/overview/overview-content/description-section/description/context.tsx',
);
