import { Editor, EditorContent } from '@/components/ui/Editor';
import { stringifyDescription } from '@/shared/prosemirror/convertDescription';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTaskFeedListItemContext } from '../../Provider';
import { Container } from './Container';
import { ToolBar } from './ToolBar';

export const ContentText = memo(function ContentText() {
  const { taskFeed, editable, onChangeDescription } =
    useTaskFeedListItemContext();
  const [resetView, setResetView] = useState<number>(1);
  const value = useMemo(
    () => stringifyDescription(taskFeed.description),
    [taskFeed.description],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setResetView((s) => s + 1);
  }, [editable, taskFeed.description]);

  return (
    <Container>
      <Editor
        initialValue={value}
        editable={editable}
        onChange={onChangeDescription}
        resetView={resetView}
      >
        <EditorContent />
        <ToolBar />
      </Editor>
    </Container>
  );
});
