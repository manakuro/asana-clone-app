import { useMemo } from 'react';
import { isMarkActive } from '@/shared/prosemirror/commands';
import { schema } from '@/shared/prosemirror/config';
import { toggleMarkUnderline } from '@/shared/prosemirror/config/commands';
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
