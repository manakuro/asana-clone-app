import { AtMention, Emoji, Format } from '@/components/ui/Editor/ToolBar';
import { Button } from '@/components/ui/atoms/Button';
import { Flex } from '@/components/ui/atoms/Flex';
import { Stack } from '@/components/ui/atoms/Stack';
import { memo } from 'react';
import { useTaskFeedListItemContext } from '../../Provider';

export const ToolBar = memo(function ToolBar() {
  const { editable, onCancel, onSave } = useTaskFeedListItemContext();
  if (!editable()) return null;

  return (
    <Flex marginTop="auto" h={9}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Format />
        <AtMention />
        <Emoji />
      </Stack>
      <Flex ml="auto">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" ml={2} size="sm" w={28} onClick={onSave}>
          Save
        </Button>
      </Flex>
    </Flex>
  );
});
