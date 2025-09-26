import { List } from '@/components/ui/List';
import { isDev } from '@/shared/environment';
import { memo } from 'react';
import { MAX_WIDTH } from '../Navigation';
import { Help } from './Help';
import { InviteTeammates } from './InviteTeammates';
import { ResetToken } from './ResetToken';

export const Footer = memo(function Footer() {
  return (
    <List w={MAX_WIDTH}>
      <InviteTeammates />
      <Help />
      {isDev() && <ResetToken />}
    </List>
  );
});
