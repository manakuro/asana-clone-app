import { useMemo } from 'react';
import { liftListItemCommand } from '@/lib/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useDecreaseListIndent = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: liftListItemCommand,
      isEnable: liftListItemCommand,
    }),
    [],
  );
};
