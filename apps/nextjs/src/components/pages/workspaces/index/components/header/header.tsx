import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Separator } from '@/components/ui/separator';
import { InviteButton } from './invite-button';
import { SkeletonHeader } from './skeleton-header';
import { Tabs } from './tabs';
import { WorkspaceTeammates } from './workspace-teammates';

type Props = {
  loading?: boolean;
};
export const Header = memo(function Header(props: Props) {
  if (props.loading) {
    return <SkeletonHeader />;
  }

  return (
    <Flex flex={1}>
      <Tabs />
      <WorkspaceTeammates />
      <InviteButton ml={2} />
      <Flex mx={3} my={4}>
        <Separator orientation="vertical" />
      </Flex>
    </Flex>
  );
});
