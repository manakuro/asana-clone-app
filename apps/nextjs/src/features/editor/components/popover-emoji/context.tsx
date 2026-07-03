import { useCallback, useState } from 'react';
import type { BaseEmoji } from '@/lib/emoji';
import { createContext } from '@/lib/react/create-context';

type ContextProps = {
  open: boolean;
  emoji: BaseEmoji | null;
  onClose: (data?: BaseEmoji) => void;
  onOpen: () => Promise<BaseEmoji>;
};

type Props = {
  onChange?: (emoji?: BaseEmoji) => void;
};
const useValue = (props: Props): ContextProps => {
  const [open, setIsOpen] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<BaseEmoji | null>(null);
  const [callback, setCallback] = useState<(val?: BaseEmoji) => void>();

  const onClose = useCallback(
    (data?: BaseEmoji) => {
      setIsOpen(false);
      callback?.(data);
      props.onChange?.(data);
      setEmoji(data ?? null);
    },
    [callback, props],
  );

  const onOpen = useCallback((): Promise<BaseEmoji> => {
    return new Promise((resolve) => {
      setIsOpen(true);
      setCallback(() => resolve);
    });
  }, []);

  return {
    open,
    emoji,
    onClose,
    onOpen,
  };
};
export const { Context, useContext: usePopoverEmojiContext } = createContext(
  useValue,
  '@/components/features/popovers/popover-emoji/context.tsx',
);
