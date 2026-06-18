import { memo } from 'react';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useTaskFeedListItemContext } from '../Provider';
import { CreateAt } from './CreateAt';
import { FeedOptionMenu } from './FeedOptionMenu';
import { Like } from './Like';
import { Title } from './Title';

export const Header = memo(function Header() {
  const { teammate } = useTaskFeedListItemContext();

  return (
    <Flex alignItems="center" flex={1}>
      <TeammateAvatar teammateId={teammate.id} size="xs" />
      <Title />
      <CreateAt />
      <Stack direction="row" ml="auto" gap={2}>
        <Like />
        <FeedOptionMenu />
      </Stack>
    </Flex>
  );
});
