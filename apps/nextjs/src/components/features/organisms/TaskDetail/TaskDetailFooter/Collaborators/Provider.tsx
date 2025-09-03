import { createProvider } from '@/shared/react/createProvider';
import { useCallback, useState } from 'react';

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
export const { Provider, useContext: useCollaboratorsContext } = createProvider(
  useValue,
  '@/components/organisms/TaskDetail/TaskDetailFooter/Collaborators/Provider.tsx',
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
