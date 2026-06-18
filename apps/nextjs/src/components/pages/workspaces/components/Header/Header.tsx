import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Separator } from '@/components/ui/separator';
import { InviteButton } from './InviteButton';
import { SkeletonHeader } from './SkeletonHeader';
import { Tabs } from './Tabs';
import { WorkspaceTeammates } from './WorkspaceTeammates';

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
