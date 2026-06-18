import { memo } from 'react';
import { Editor, EditorContent } from '@/components/ui/editor';
import { Flex } from '@/components/ui/flex';
import { getDefaultDescription } from '@/shared/prosemirror/getDefaultDescription';
import { Attachments } from './Attachments';
import { Container } from './Container';
import { Placeholder } from './Placeholder';
import { Provider, useInputContext } from './Provider';
import { ToolBar } from './ToolBar';

const initialValue = JSON.stringify(getDefaultDescription());

export function Input() {
  return (
    <Provider>
      <Component />
    </Provider>
  );
}

const Component = memo(function Component() {
  const { onChangeDescription } = useInputContext();

  return (
    <Flex ml={2} flex={1}>
      <Container>
        <Editor onChange={onChangeDescription} initialValue={initialValue}>
          <EditorContent />
          <Placeholder />
          <Attachments />
          <ToolBar />
        </Editor>
      </Container>
    </Flex>
  );
});
