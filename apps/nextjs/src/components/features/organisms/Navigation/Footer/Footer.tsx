import { List } from '@/components/ui/atoms';
import type React from 'react';
import { memo } from 'react';
import { MAX_WIDTH } from '../Navigation';
import { Help } from './Help';
import { InviteTeammates } from './InviteTeammates';
import { ResetToken } from './ResetToken';

export const Footer: React.FC = memo(() => {
  return (
    <List w={MAX_WIDTH}>
      <InviteTeammates />
      <Help />
      {__DEV__ && <ResetToken />}
    </List>
  );
});
