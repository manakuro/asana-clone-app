import type { Command } from 'prosemirror-state';
import { useCallback, useMemo } from 'react';
import { usePopoverEmojiContext } from '@/components/features/Popovers';
import type { ToolbarItem } from './types';

export const useEmoji = (): ToolbarItem => {
  const { onOpen } = usePopoverEmojiContext();
  const action = useCallback<
    (
      state: Parameters<Command>[0],
      dispatch: Parameters<Command>[1],
      view: Parameters<Command>[2],
    ) => Promise<boolean>
  >(
    async (state, dispatch) => {
      const emoji = await onOpen();
      if (!emoji) return false;

      const { tr } = state;
      tr.insertText(emoji.native);
      dispatch?.(tr);
      return true;
    },
    [onOpen],
  );

  return useMemo(
    () => ({
      action,
    }),
    [action],
  );
};
