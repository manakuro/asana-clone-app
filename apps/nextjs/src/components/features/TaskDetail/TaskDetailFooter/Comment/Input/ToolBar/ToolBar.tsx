import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { AtMention, Emoji, Format } from '@/components/ui/editor/tool-bar';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { transitions } from '@/styles/transitions';
import { useInputContext } from '../Provider';
import { Attachment } from './Attachment';

export const ToolBar = memo(function ToolBar() {
  const { focused, onSave } = useInputContext();

  return (
    <Flex
      marginTop="auto"
      h={focused ? 9 : 0}
      transition={transitions.base('height')}
      overflow="hidden"
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Format />
        <AtMention />
        <Emoji />
        <Attachment />
      </Stack>
      <Button colorPalette="teal" ml="auto" size="sm" onClick={onSave}>
        Comment
      </Button>
    </Flex>
  );
});
