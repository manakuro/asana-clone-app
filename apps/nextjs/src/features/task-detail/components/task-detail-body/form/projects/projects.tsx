import { memo, useCallback } from 'react';
import { Flex } from '@/components/ui/flex';
import { Input } from '@/features/task-detail/components/task-detail-body/form/projects/input';
import { useTaskDetailProjectsInput } from '@/features/task-detail/hooks';
import { useProjectTaskSectionsByProjectIdsQuery } from '@/hooks/queries/use-project-task-sections-by-project-ids-query';
import {
  useProjectIdsByTaskId,
  useProjectTaskCommand,
  useProjectTaskIdsByTaskId,
} from '@/store/entities/project-task';
import { useTask } from '@/store/entities/task';
import { Content, Label, Row } from '../row';
import { Selected } from './selected';
import { UnSelected } from './un-selected';

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
            {inputDisclosure.open && (
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
            open={inputDisclosure.open}
          />
        )}
      </Content>
    </Row>
  );
});
