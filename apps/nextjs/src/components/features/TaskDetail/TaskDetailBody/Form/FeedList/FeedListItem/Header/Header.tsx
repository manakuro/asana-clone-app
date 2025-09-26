import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { Flex } from '@/components/ui/Flex';
import { Stack } from '@/components/ui/Stack';
import { memo } from 'react';
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
      <Stack direction="row" ml="auto" spacing={2}>
        <Like />
        <FeedOptionMenu />
      </Stack>
    </Flex>
  );
});
