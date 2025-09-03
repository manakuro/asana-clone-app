import type { FlexProps } from '@/components/ui/atoms';
import { isHTMLElement } from '@/shared/isHTMLElement';
import { createProvider } from '@/shared/react/createProvider';
import type React from 'react';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';

type ContextProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  inputFocused: boolean;
  setInputFocused: Dispatch<SetStateAction<boolean>>;
  cellStyle?: FlexProps;
  onInputFocus: () => void;
  onInputBlur: () => void;
  onInputSelect: () => void;
};

const useValue = (): ContextProps => {
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
export const { Provider, useContext: useTasksBoardListItemInputContext } =
  createProvider(
    useValue,
    '@/components/organisms/Tasks/TasksBoard/TasksBoardListItem/Provider/InputProvider.tsx',
  );
