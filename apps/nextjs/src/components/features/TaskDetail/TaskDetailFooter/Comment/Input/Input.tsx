import { memo, useEffect, useState } from 'react';
import { Editor, EditorContent } from '@/components/ui/Editor';
import { Flex } from '@/components/ui/Flex';
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
  const { onChangeDescription, taskFeed } = useInputContext();
  const [resetView, setResetView] = useState<number>(1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: to reset view
  useEffect(() => {
    setResetView((s) => s + 1);
  }, [taskFeed.id]);

  return (
    <Flex ml={2} flex={1}>
      <Container>
        <Editor
          onChange={onChangeDescription}
          initialValue={initialValue}
          resetView={resetView}
        >
          <EditorContent />
          <Placeholder />
          <Attachments />
          <ToolBar />
        </Editor>
      </Container>
    </Flex>
  );
});
