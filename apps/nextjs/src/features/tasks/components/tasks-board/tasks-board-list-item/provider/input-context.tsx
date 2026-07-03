import { useCallback, useRef, useState } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { createContext } from '@/shared/react/create-context';
import { isHTMLElement } from '@/utils/is-html-element';

const useValue = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [focused, setFocused] = useState(false);
  const [cellStyle, setCellStyle] = useState<FlexProps>();
  const onInputFocus = useCallback(() => {
    setCellStyle({
      borderColor: 'cyan.400',
      _hover: {
        bg: 'white',
      },
    });
    setFocused(true);
  }, []);
  const onInputBlur = useCallback(() => {
    setCellStyle({});
    setFocused(false);
  }, []);

  const onInputSelect = useCallback(() => {
    if (!isHTMLElement(ref.current)) return;
    ref.current.focus();
    ref.current.select();
  }, []);

  return {
    ref,
    inputFocused: focused,
    setInputFocused: setFocused,
    cellStyle,
    onInputFocus,
    onInputBlur,
    onInputSelect,
  };
};
export const { Context, useContext: useTasksBoardListItemInputContext } =
  createContext(
    useValue,
    '@/components/features/tasks/tasks-board/tasks-board-list-item/provider/input-context.tsx',
  );
