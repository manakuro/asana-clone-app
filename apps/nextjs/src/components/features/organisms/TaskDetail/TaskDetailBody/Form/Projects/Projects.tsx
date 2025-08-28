import { Input } from '@/components/features/organisms/TaskDetail/TaskDetailBody/Form/Projects/Input';
import { useTaskDetailProjectsInput } from '@/components/features/organisms/TaskDetail/hooks';
import { Flex } from '@/components/ui/atoms';
import { useProjectTaskSectionsByProjectIdsQuery } from '@/hooks/queries/entities';
import {
  useProjectIdsByTaskId,
  useProjectTaskCommand,
  useProjectTaskIdsByTaskId,
} from '@/store/entities/projectTask';
import { useTask } from '@/store/entities/task';
import { memo, useCallback } from 'react';
import { Content, Label, Row } from '../Row';
import { Selected } from './Selected';
import { UnSelected } from './UnSelected';

type Props = {
  taskId: string;
};

export const Projects = memo(function Projects(props: Props) {
  const { taskId } = props;
  const { isSubtask } = useTask(taskId);
  const { projectIds } = useProjectIdsByTaskId(taskId);
  const { projectTaskIds } = useProjectTaskIdsByTaskId(taskId);
  const { setProjectTask, deleteProjectTask } = useProjectTaskCommand();
  const hasProject = projectIds.length > 0;
  const inputDisclosure = useTaskDetailProjectsInput();

  useProjectTaskSectionsByProjectIdsQuery(projectIds);

  const handleChange = useCallback(
    async (input: { projectTaskId: string; projectTaskSectionId: string }) => {
      await setProjectTask({
        id: input.projectTaskId,
        projectTaskSectionId: input.projectTaskSectionId,
      });
    },
    [setProjectTask],
  );

  const handleDelete = useCallback(
    async (projectTaskId: string) => {
      await deleteProjectTask({ id: projectTaskId });
    },
    [deleteProjectTask],
  );

  if (isSubtask) return null;

  return (
    <Row>
      <Label>Projects</Label>
      <Content>
        {hasProject ? (
          <Flex flexDirection="column">
            {projectTaskIds.map((id) => (
              <Selected
                taskId={taskId}
                projectTaskId={id}
                key={id}
                onChange={handleChange}
                onDelete={handleDelete}
                onClick={inputDisclosure.onOpen}
              />
            ))}
            {inputDisclosure.isOpen && (
              <Flex flex={1}>
                <Input onClose={inputDisclosure.onClose} taskId={taskId} />
              </Flex>
            )}
          </Flex>
        ) : (
          <UnSelected
            taskId={taskId}
            onClick={inputDisclosure.onOpen}
            onClose={inputDisclosure.onClose}
            isOpen={inputDisclosure.isOpen}
          />
        )}
      </Content>
    </Row>
  );
});
