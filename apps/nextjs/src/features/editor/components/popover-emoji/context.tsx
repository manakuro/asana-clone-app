import { useCallback, useState } from 'react';
import type { SelectedEmoji } from '@/lib/emoji';
import { createContext } from '@/lib/react/create-context';

type Props = {
  onChange?: (emoji?: SelectedEmoji) => void;
};
const useValue = (props: Props) => {
  const [open, setIsOpen] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<SelectedEmoji | null>(null);
  const [callback, setCallback] = useState<(val?: SelectedEmoji) => void>();

  const onClose = useCallback(
    (data?: SelectedEmoji) => {
      setIsOpen(false);
      callback?.(data);
      props.onChange?.(data);
      setEmoji(data ?? null);
    },
    [callback, props],
  );

  const onOpen = useCallback((): Promise<SelectedEmoji> => {
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
