import { useCallback, useEffect, useState } from 'react';

type Props = {
  targetKey: string;
  onKeyPress?: () => void;
};

export const useKeyPress = (props: Props) => {
  const { targetKey, onKeyPress } = props;
  const [keyPressed, setKeyPressed] = useState(false);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        setKeyPressed(true);
        onKeyPress?.();
      }
    },
    [targetKey, onKeyPress],
  );

  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
  }, [handleKeydown, handleKeyup]);

  return {
    keyPressed,
  };
};
