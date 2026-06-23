import { memo, useCallback, useMemo } from 'react';
import { Editor, EditorContent } from '@/components/ui/editor';
import { isDescriptionEqual } from '@/shared/editor/isDescriptionEqual';
import {
  parseDescription,
  stringifyDescription,
} from '@/shared/prosemirror/convertDescription';
import { useTask } from '@/store/entities/task';
import { Content, Label, Row } from '../row';
import { Container } from './container';
import { Placeholder } from './placeholder';
import { Provider } from './provider';
import { ToolBar } from './tool-bar';

type Props = {
  taskId: string;
};

export const Description = memo(function Description(props: Props) {
  return (
    <Provider>
      <DescriptionHandler {...props} />
    </Provider>
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

  return <Component onChange={handleChange} initialValue={initialValue} />;
});

type ComponentProps = {
  onChange: (val: string) => void;
  initialValue: string;
};
const Component = memo(function Component(props: ComponentProps) {
  const { onChange, initialValue } = props;

  const handleChange = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange],
  );

  return (
    <Row>
      <Label>Description</Label>
      <Content>
        <Container>
          <Editor onChange={handleChange} initialValue={initialValue}>
            <EditorContent />
            <Placeholder />
            <ToolBar />
          </Editor>
        </Container>
      </Content>
    </Row>
  );
});
