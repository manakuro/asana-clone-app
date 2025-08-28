import { Divider, Flex, Stack } from '@/components/ui/atoms';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@/components/ui/organisms/Modal';
import { useProject, useProjectCommand } from '@/store/entities/project';
import { memo, useCallback } from 'react';
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
    <ModalContent>
      <ModalHeader>Project details</ModalHeader>
      <ModalCloseButton />
      <Divider />
      <ModalBody py={4}>
        <Stack spacing={6}>
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
          <Divider />
          <Flex flexDirection="column">
            <DescriptionTitle projectId={projectId} />
            <Description projectId={projectId} />
          </Flex>
        </Stack>
      </ModalBody>
    </ModalContent>
  );
});
