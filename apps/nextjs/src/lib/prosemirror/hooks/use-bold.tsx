import { useMemo } from 'react';
import { isMarkActive } from '@/lib/prosemirror/commands';
import { schema } from '@/lib/prosemirror/config';
import { toggleMarkBold } from '@/lib/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useBold = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkBold,
      isActive: isMarkActive(schema.marks.bold),
    }),
    [],
  );
};
