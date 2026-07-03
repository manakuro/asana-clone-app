import { useMemo } from 'react';
import { isBlockActive } from '@/lib/prosemirror/commands';
import { schema } from '@/lib/prosemirror/config';
import { setListTypeBullet } from '@/lib/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useBulletList = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: setListTypeBullet,
      isActive: isBlockActive(schema.nodes.list, { type: 'bullet' }),
    }),
    [],
  );
};
