import { useMemo } from 'react';
import { isMarkActive } from '@/lib/prosemirror/commands';
import { schema } from '@/lib/prosemirror/config';
import { toggleMarkStrikethrough } from '@/lib/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useStrikethrough = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkStrikethrough,
      isActive: isMarkActive(schema.marks.strikethrough),
    }),
    [],
  );
};
