import { Flex } from '@/components/ui/Flex';
import { Stack } from '@/components/ui/Stack';
import { memo } from 'react';
import { useTaskFeedListItemContext } from '../Provider';
import { ContentAttachment } from './ContentAttachment';
import { ContentText } from './ContentText';

export const Content = memo(function Content() {
  return (
    <Flex mt={2} flexDirection="column">
      <Component />
    </Flex>
  );
});
const Component = memo(function Component() {
  const { taskFileIds, hasText } = useTaskFeedListItemContext();

  return (
    <Stack flexDirection="column" flex={1} spacing={4}>
      {hasText && <ContentText />}
      <Stack spacing={4}>
        {taskFileIds.map((id) => (
          <ContentAttachment taskFileId={id} key={id} />
        ))}
      </Stack>
    </Stack>
  );
});
