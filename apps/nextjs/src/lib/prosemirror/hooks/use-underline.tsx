import { useMemo } from 'react';
import { isMarkActive } from '@/lib/prosemirror/commands';
import { schema } from '@/lib/prosemirror/config';
import { toggleMarkUnderline } from '@/lib/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useUnderline = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkUnderline,
      isActive: isMarkActive(schema.marks.underline),
    }),
    [],
  );
};
