import { useMemo } from 'react';
import { isMarkActive } from '@/lib/prosemirror/commands';
import { schema } from '@/lib/prosemirror/config';
import { toggleMarkItalic } from '@/lib/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useItalic = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkItalic,
      isActive: isMarkActive(schema.marks.italic),
    }),
    [],
  );
};
