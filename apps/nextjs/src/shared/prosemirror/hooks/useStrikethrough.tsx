import { useMemo } from 'react';
import { isMarkActive } from '@/shared/prosemirror/commands';
import { schema } from '@/shared/prosemirror/config';
import { toggleMarkStrikethrough } from '@/shared/prosemirror/config/commands';
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
