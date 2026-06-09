import { memo, useMemo } from 'react';
import { Editor, EditorContent } from '@/components/ui/Editor';
import { stringifyDescription } from '@/shared/prosemirror/convertDescription';
import { useTaskFeedListItemContext } from '../../Provider';
import { Container } from './Container';
import { ToolBar } from './ToolBar';

export const ContentText = memo(function ContentText() {
  const { taskFeed, editable, onChangeDescription } =
    useTaskFeedListItemContext();
  const value = useMemo(
    () => stringifyDescription(taskFeed.description),
    [taskFeed.description],
  );

  return (
    <Container>
      <Editor
        initialValue={value}
        editable={editable}
        onChange={onChangeDescription}
      >
        <EditorContent />
        <ToolBar />
      </Editor>
    </Container>
  );
});
