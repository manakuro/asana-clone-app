import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { AtMention, Emoji, Format } from '@/components/ui/editor/tool-bar';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useTaskFeedListItemContext } from '../../Provider';

export const ToolBar = memo(function ToolBar() {
  const { editable, onCancel, onSave } = useTaskFeedListItemContext();
  if (!editable()) return null;

  return (
    <Flex marginTop="auto" h={9}>
      <Stack direction="row" gap={1} alignItems="center">
        <Format />
        <AtMention />
        <Emoji />
      </Stack>
      <Flex ml="auto">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorPalette="teal" ml={2} size="sm" w={28} onClick={onSave}>
          Save
        </Button>
      </Flex>
    </Flex>
  );
});
