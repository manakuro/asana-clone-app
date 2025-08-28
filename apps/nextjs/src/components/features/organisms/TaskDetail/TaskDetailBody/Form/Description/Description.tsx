import { Editor, EditorContent } from '@/components/ui/organisms/Editor';
import { isDescriptionEqual } from '@/shared/editor/isDescriptionEqual';
import {
  parseDescription,
  stringifyDescription,
} from '@/shared/prosemirror/convertDescription';
import { useTask } from '@/store/entities/task';
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Content, Label, Row } from '../Row';
import { Container } from './Container';
import { Placeholder } from './Placeholder';
import { Provider } from './Provider';
import { ToolBar } from './ToolBar';

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

const DescriptionHandler: React.FC<Props> = memo<Props>((props) => {
  const { task, setTask, hasDescriptionUpdated } = useTask(props.taskId);
  const initialValue = useMemo(
    () => stringifyDescription(task.description),
    [task.description],
  );
  const [resetView, setResetView] = useState<number>(1);

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setResetView((s) => s + 1);
  }, [hasDescriptionUpdated]);

  return (
    <Component
      onChange={handleChange}
      initialValue={initialValue}
      resetView={resetView}
    />
  );
});

type ComponentProps = {
  onChange: (val: string) => void;
  initialValue: string;
  resetView: number;
};
const Component: React.FC<ComponentProps> = memo<ComponentProps>((props) => {
  const { onChange, initialValue, resetView } = props;

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
          <Editor
            onChange={handleChange}
            initialValue={initialValue}
            resetView={resetView}
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
