import { Flex } from '@/components/ui/atoms';
import { Editor, EditorContent } from '@/components/ui/organisms/Editor';
import { isDescriptionEqual } from '@/shared/editor/isDescriptionEqual';
import {
  parseDescription,
  stringifyDescription,
} from '@/shared/prosemirror/convertDescription';
import {
  useHasDescriptionUpdatedValue,
  useProject,
  useProjectCommand,
} from '@/store/entities/project';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from './Container';
import { Placeholder } from './Placeholder';
import { Provider } from './Provider';
import { ToolBar } from './ToolBar';

type Props = {
  projectId: string;
};

export const Description = memo(function Description(props: Props) {
  return (
    <Provider>
      <DescriptionHandler {...props} />
    </Provider>
  );
});

const DescriptionHandler = memo(function DescriptionHandler(props: Props) {
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { setProject } = useProjectCommand();
  const initialValue = useMemo(
    () => stringifyDescription(project.description),
    [project.description],
  );
  const { hasDescriptionUpdated } = useHasDescriptionUpdatedValue({
    projectId,
  });
  const [resetView, setResetView] = useState<number>(1);

  const handleChange = useCallback(
    async (val: string) => {
      const description = parseDescription(val);
      if (isDescriptionEqual(description, project.description)) return;

      await setProject({ description, projectId });
    },
    [project.description, setProject, projectId],
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
const Component = memo(function Component(props: ComponentProps) {
  const { onChange, initialValue, resetView } = props;

  const handleChange = useCallback(
    (val: string) => {
      console.log('change!');
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
        <Flex flex={1} flexDirection="column">
          <EditorContent style={{ minHeight: '80px' }} />
          <Placeholder />
        </Flex>
        <ToolBar />
      </Editor>
    </Container>
  );
});
