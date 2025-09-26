import { Editor, EditorContent } from '@/components/ui/Editor';
import { isDescriptionEqual } from '@/shared/editor/isDescriptionEqual';
import {
  parseDescription,
  stringifyDescription,
} from '@/shared/prosemirror/convertDescription';
import { useWorkspace, useWorkspaceCommand } from '@/store/entities/workspace';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from './Container';
import { Placeholder } from './Placeholder';
import { Provider } from './Provider';

export const Description = memo(function Description() {
  return (
    <Provider>
      <DescriptionHandler />
    </Provider>
  );
});

const DescriptionHandler = memo(function DescriptionHandler() {
  const { workspace, hasDescriptionUpdated } = useWorkspace();
  const { setWorkspace } = useWorkspaceCommand();
  const initialValue = useMemo(
    () => stringifyDescription(workspace.description),
    [workspace.description],
  );
  const [resetView, setResetView] = useState<number>(1);

  const handleChange = useCallback(
    async (val: string) => {
      const description = parseDescription(val);
      if (isDescriptionEqual(description, workspace.description)) return;

      console.log('change!');
      await setWorkspace({
        description,
      });
    },
    [setWorkspace, workspace.description],
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
const Component = memo<ComponentProps>(function Component(props) {
  const { onChange, initialValue, resetView } = props;

  const handleChange = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange],
  );

  return (
    <Container>
      <Editor
        onChange={handleChange}
        initialValue={initialValue}
        resetView={resetView}
      >
        <EditorContent />
        <Placeholder />
      </Editor>
    </Container>
  );
});
