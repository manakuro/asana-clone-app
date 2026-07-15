import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Editor,
  EditorContent,
  type EditorHandle,
} from '@/components/ui/editor';
import { isDescriptionEqual } from '@/features/editor/utils/is-description-equal';
import { useTask } from '@/features/task/store/task';
import { usePrevious } from '@/hooks/use-previous';
import {
  parseDescription,
  stringifyDescription,
} from '@/lib/prosemirror/convert-description';
import { Content, Label, Row } from '../row';
import { Container } from './container';
import { Context } from './context';
import { Placeholder } from './placeholder';
import { ToolBar } from './tool-bar';

type Props = {
  taskId: string;
};

export const Description = memo(function Description(props: Props) {
  return (
    <Context>
      <DescriptionHandler {...props} />
    </Context>
  );
});

const DescriptionHandler = memo(function DescriptionHandler(props: Props) {
  const { task, setTask } = useTask(props.taskId);
  const initialValue = useMemo(
    () => stringifyDescription(task.description),
    [task.description],
  );

  const handleChange = useCallback(
    async (val: string) => {
      const description = parseDescription(val);
      if (isDescriptionEqual(description, task.description)) return;

      console.log('change!');
      await setTask({
        description,
      });
    },
    [setTask, task.description],
  );

  return (
    <Component
      onChange={handleChange}
      initialValue={initialValue}
      taskId={props.taskId}
    />
  );
});

type ComponentProps = {
  onChange: (val: string) => void;
  initialValue: string;
  taskId: string;
};
const Component = memo(function Component(props: ComponentProps) {
  const { onChange, initialValue } = props;

  const handleChange = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange],
  );
  const editorRef = useRef<EditorHandle>(null);
  const prevTaskId = usePrevious(props.taskId);

  useEffect(() => {
    if (!editorRef.current) return;
    if (prevTaskId === props.taskId) return;

    editorRef.current.reset();
  }, [prevTaskId, props.taskId]);

  return (
    <Row>
      <Label>Description</Label>
      <Content>
        <Container>
          <Editor
            ref={editorRef}
            onChange={handleChange}
            initialValue={initialValue}
          >
            <EditorContent />
            <Placeholder />
            <ToolBar />
          </Editor>
        </Container>
      </Content>
    </Row>
  );
});
