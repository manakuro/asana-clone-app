import { CloseButton } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Flex } from '@/components/ui/flex';
import { Separator } from '@/components/ui/separator';
import { Stack } from '@/components/ui/stack';
import { useProject, useProjectCommand } from '@/store/entities/project';
import { Description } from './Description';
import { DescriptionTitle } from './DescriptionTitle';
import { Label } from './Label';
import { NameField } from './NameField';
import { ProjectDueDate } from './ProjectDueDate';
import { ProjectOwner } from './ProjectOwner';

type Props = {
  projectId: string;
};

export const Content = memo(function Content(props: Props) {
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { setProject } = useProjectCommand();

  const handleChangeName = useCallback(
    async (val: string) => {
      if (!val) return;
      if (val === project.name) return;
      await setProject({ name: val, projectId });
    },
    [project.name, setProject, projectId],
  );

  return (
    <Dialog.Content>
      <Dialog.Header>Project details</Dialog.Header>
      <Separator />
      <Dialog.Body py={4}>
        <Stack gap={6}>
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <Label>Name</Label>
              <NameField value={project.name} onChange={handleChangeName} />
            </Flex>
            <Flex mt={4}>
              <Flex flex={1}>
                <ProjectOwner projectId={projectId} />
              </Flex>
              <Flex flex={1}>
                <ProjectDueDate projectId={projectId} />
              </Flex>
            </Flex>
          </Flex>
          <Separator />
          <Flex flexDirection="column">
            <DescriptionTitle projectId={projectId} />
            <Description projectId={projectId} />
          </Flex>
        </Stack>
      </Dialog.Body>
      <Dialog.CloseTrigger asChild>
        <CloseButton />
      </Dialog.CloseTrigger>
    </Dialog.Content>
  );
});
