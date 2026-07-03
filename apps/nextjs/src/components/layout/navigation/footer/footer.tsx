import { memo } from 'react';
import { List } from '@/components/ui/list';
import { isDev } from '@/utils/environment';
import { MAX_WIDTH } from '../navigation';
import { Help } from './help';
import { InviteTeammates } from './invite-teammates';
import { ResetToken } from './reset-token';

export const Footer = memo(function Footer() {
  return (
    <List.Root w={MAX_WIDTH}>
      <InviteTeammates />
      <Help />
      {isDev() && <ResetToken />}
    </List.Root>
  );
});
