import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { TeammateAvatar } from '@/features/teammates/components/teammate-avatar';
import { useTaskFeedListItemContext } from '../provider';
import { CreateAt } from './create-at';
import { FeedOptionMenu } from './feed-option-menu';
import { Like } from './like';
import { Title } from './title';

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
