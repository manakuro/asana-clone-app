import { useCallback, useState } from 'react';
import { createContext } from '@/shared/react/create-context';

type ContextProps = {
  onInputFocus: () => void;
  onInputUnfocus: () => void;
  isInputFocused: boolean;
};

const useValue = (): ContextProps => {
  const { onInputFocus, onInputUnfocus, isInputFocused } = useInput();

  return {
    isInputFocused,
    onInputFocus,
    onInputUnfocus,
  } as const;
};
export const { Context, useContext: useCollaboratorsContext } = createContext(
  useValue,
  '@/components/features/task-detail/task-detail-footer/collaborators/context.tsx',
);

function useInput() {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const onInputFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const onInputUnfocus = useCallback(() => {
    setIsInputFocused(false);
  }, []);

  return {
    isInputFocused,
    onInputFocus,
    onInputUnfocus,
  };
}
