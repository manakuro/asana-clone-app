import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Separator } from '@/components/ui/separator';
import { Avatar } from './Avatar';
import { ShareButton } from './ShareButton';
import { SkeletonHeader } from './SkeletonHeader';
import { Tabs } from './Tabs';

type Props = {
  loading?: boolean;
};
export const Header = memo(function Header(props: Props) {
  if (props.loading) {
    return <SkeletonHeader />;
  }

  return (
    <Flex flex={1}>
      <Avatar />
      <Tabs />
      <ShareButton />
      <Flex mx={3} my={4}>
        <Separator orientation="vertical" />
      </Flex>
    </Flex>
  );
});
