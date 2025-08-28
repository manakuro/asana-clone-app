import { Box, Button, Flex, Icon, Stack } from '@/components/ui/atoms';
import { useProjectTask } from '@/store/entities/projectTask';
import { memo, useCallback } from 'react';
import { ProjectButton } from './ProjectButton';
import { Section } from './Section';

type Props = {
  taskId: string;
  projectTaskId: string;
  onChange: (input: {
    projectTaskId: string;
    projectTaskSectionId: string;
  }) => void;
  onDelete: (projectTaskId: string) => void;
  onClick: () => void;
};

export const Selected = memo(function Selected(props: Props) {
  const { taskId, projectTaskId, onChange, onDelete, onClick } = props;
  const { projectTask } = useProjectTask(projectTaskId);

  const handleDelete = useCallback(() => {
    onDelete(projectTaskId);
  }, [onDelete, projectTaskId]);

  return (
    <Flex flexDirection="column">
      <Stack
        spacing={1}
        direction="row"
        display="flex"
        alignItems="center"
        mt={1}
        mb={2}
      >
        <ProjectButton projectId={projectTask.projectId} />
        <Section
          taskId={taskId}
          projectTaskId={projectTaskId}
          onChange={onChange}
        />
        <Button
          as={Box}
          variant="ghost"
          size="xs"
          cursor="pointer"
          onClick={handleDelete}
        >
          <Icon icon="x" color="text.muted" />
        </Button>
        <Button
          as={Box}
          variant="ghost"
          size="xs"
          cursor="pointer"
          onClick={onClick}
        >
          <Icon icon="plus" color="text.muted" />
        </Button>
      </Stack>
    </Flex>
  );
});
