import { useMemo } from 'react';
import { sinkListItemCommand } from '@/shared/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useIncreaseListIndent = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: sinkListItemCommand,
      isEnable: sinkListItemCommand,
    }),
    [],
  );
};
