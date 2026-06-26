import { memo, useCallback, useMemo } from 'react';
import { Editor, EditorContent } from '@/components/ui/editor';
import { Flex } from '@/components/ui/flex';
import { isDescriptionEqual } from '@/shared/editor/is-description-equal';
import {
  parseDescription,
  stringifyDescription,
} from '@/shared/prosemirror/convert-description';
import { useProject, useProjectCommand } from '@/store/entities/project';
import { Container } from './container';
import { Placeholder } from './placeholder';
import { Context } from './provider';
import { ToolBar } from './tool-bar';

type Props = {
  projectId: string;
};

export const Description = memo(function Description(props: Props) {
  return (
    <Context>
      <DescriptionHandler {...props} />
    </Context>
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

  const handleChange = useCallback(
    async (val: string) => {
      const description = parseDescription(val);
      if (isDescriptionEqual(description, project.description)) return;

      await setProject({ description, projectId });
    },
    [project.description, setProject, projectId],
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
      console.log('change!');
      onChange(val);
    },
    [onChange],
  );

  return (
    <Container>
      <Editor onChange={handleChange} initialValue={initialValue}>
        <Flex flex={1} flexDirection="column">
          <EditorContent style={{ minHeight: '80px' }} />
          <Placeholder />
        </Flex>
        <ToolBar />
      </Editor>
    </Container>
  );
});
