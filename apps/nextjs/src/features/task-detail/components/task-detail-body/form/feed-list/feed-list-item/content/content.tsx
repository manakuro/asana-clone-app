import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useTaskFeedListItemContext } from '../provider';
import { ContentAttachment } from './content-attachment';
import { ContentText } from './content-text';

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
    <Stack flexDirection="column" flex={1} gap={4}>
      {hasText && <ContentText />}
      <Stack gap={4}>
        {taskFileIds.map((id) => (
          <ContentAttachment taskFileId={id} key={id} />
        ))}
      </Stack>
    </Stack>
  );
});
