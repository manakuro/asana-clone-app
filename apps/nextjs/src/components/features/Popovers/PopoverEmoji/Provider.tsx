import type { BaseEmoji } from '@/shared/emoji';
import { createProvider } from '@/shared/react/createProvider';
import { useCallback, useState } from 'react';

type ContextProps = {
  isOpen: boolean;
  emoji: BaseEmoji | null;
  onClose: (data?: BaseEmoji) => void;
  onOpen: () => Promise<BaseEmoji>;
};

type Props = {
  onChange?: (emoji?: BaseEmoji) => void;
};
const useValue = (props: Props): ContextProps => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    isOpen,
    emoji,
    onClose,
    onOpen,
  };
};
export const { Provider, useContext: usePopoverEmojiContext } = createProvider(
  useValue,
  '@/components/organisms/Popovers/PopoverEmoji/Provider.tsx',
);
