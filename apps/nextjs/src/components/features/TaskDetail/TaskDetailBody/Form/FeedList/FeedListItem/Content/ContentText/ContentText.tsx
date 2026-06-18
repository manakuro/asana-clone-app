import { memo, useEffect, useMemo, useRef } from 'react';
import {
  Editor,
  EditorContent,
  type EditorHandle,
} from '@/components/ui/editor';
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
  const editorRef = useRef<EditorHandle>(null);

  useEffect(() => {
    editorRef.current?.setEditable(editable);
  }, [editable]);

  return (
    <Container>
      <Editor
        initialValue={value}
        editable={editable}
        onChange={onChangeDescription}
        ref={editorRef}
      >
        <EditorContent />
        <ToolBar />
      </Editor>
    </Container>
  );
});
