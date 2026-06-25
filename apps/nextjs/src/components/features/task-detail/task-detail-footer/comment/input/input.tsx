import { memo } from 'react';
import { Editor, EditorContent } from '@/components/ui/editor';
import { Flex } from '@/components/ui/flex';
import { getDefaultDescription } from '@/shared/prosemirror/get-default-description';
import { Attachments } from './attachments';
import { Container } from './container';
import { Placeholder } from './placeholder';
import { Provider, useInputContext } from './provider';
import { ToolBar } from './tool-bar';

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
