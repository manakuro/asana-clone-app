import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Separator } from '@/components/ui/separator';
import { ProjectIcon } from './project-icon';
import { ProjectTeammates } from './project-teammates';
import { ShareButton } from './share-button';
import { SkeletonHeader } from './skeleton-header';
import { Tabs } from './tabs';

type Props = {
  loading?: boolean;
};
export const Header = memo(function Header(props: Props) {
  if (props.loading) {
    return <SkeletonHeader />;
  }

  return (
    <Flex flex={1}>
      <ProjectIcon />
      <Tabs />
      <ProjectTeammates />
      <ShareButton ml={2} />
      <Flex mx={3} my={4}>
        <Separator orientation="vertical" />
      </Flex>
    </Flex>
  );
});
