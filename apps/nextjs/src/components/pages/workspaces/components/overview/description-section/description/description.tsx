import { memo, useCallback, useMemo } from 'react';
import { Editor, EditorContent } from '@/components/ui/editor';
import { isDescriptionEqual } from '@/shared/editor/is-description-equal';
import {
  parseDescription,
  stringifyDescription,
} from '@/shared/prosemirror/convert-description';
import { useWorkspace, useWorkspaceCommand } from '@/store/entities/workspace';
import { Container } from './container';
import { Placeholder } from './placeholder';
import { Provider } from './provider';

export const Description = memo(function Description() {
  return (
    <Provider>
      <DescriptionHandler />
    </Provider>
  );
});

const DescriptionHandler = memo(function DescriptionHandler() {
  const { workspace } = useWorkspace();
  const { setWorkspace } = useWorkspaceCommand();
  const initialValue = useMemo(
    () => stringifyDescription(workspace.description),
    [workspace.description],
  );

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

  return <Component onChange={handleChange} initialValue={initialValue} />;
});

type ComponentProps = {
  onChange: (val: string) => void;
  initialValue: string;
};
const Component = memo<ComponentProps>(function Component(props) {
  const { onChange, initialValue } = props;

  const handleChange = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange],
  );

  return (
    <Container>
      <Editor onChange={handleChange} initialValue={initialValue}>
        <EditorContent />
        <Placeholder />
      </Editor>
    </Container>
  );
});
