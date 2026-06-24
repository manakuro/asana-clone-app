import { useMemo } from 'react';
import { isBlockActive } from '@/shared/prosemirror/commands';
import { schema } from '@/shared/prosemirror/config';
import { setListTypeBullet } from '@/shared/prosemirror/config/commands';
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
