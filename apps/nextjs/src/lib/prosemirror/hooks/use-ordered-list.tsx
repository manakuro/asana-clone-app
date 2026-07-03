import { useMemo } from 'react';
import { isBlockActive } from '@/lib/prosemirror/commands';
import { schema } from '@/lib/prosemirror/config';
import { setListTypeOrdered } from '@/lib/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useOrderedList = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: setListTypeOrdered,
      isActive: isBlockActive(schema.nodes.list, { type: 'ordered' }),
    }),
    [],
  );
};
