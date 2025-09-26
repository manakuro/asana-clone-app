import { Button } from '@/components/ui/Button';
import { AtMention, Emoji, Format } from '@/components/ui/Editor/ToolBar';
import { Flex } from '@/components/ui/Flex';
import { Stack } from '@/components/ui/Stack';
import { transitions } from '@/styles';
import { memo } from 'react';
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
      <Stack direction="row" spacing={1} alignItems="center">
        <>
          <Format />
          <AtMention />
          <Emoji />
          <Attachment />
        </>
      </Stack>
      <Button colorScheme="teal" ml="auto" size="sm" onClick={onSave}>
        Comment
      </Button>
    </Flex>
  );
});
