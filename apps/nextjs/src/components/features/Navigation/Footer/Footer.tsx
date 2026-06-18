import { memo } from 'react';
import { List } from '@/components/ui/list';
import { isDev } from '@/shared/environment';
import { MAX_WIDTH } from '../Navigation';
import { Help } from './Help';
import { InviteTeammates } from './InviteTeammates';
import { ResetToken } from './ResetToken';

export const Footer = memo(function Footer() {
  return (
    <List.Root w={MAX_WIDTH}>
      <InviteTeammates />
      <Help />
      {isDev() && <ResetToken />}
    </List.Root>
  );
});
