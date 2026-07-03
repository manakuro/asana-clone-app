import { memo } from 'react';
import { Box } from '@/components/ui/box';
import { useProject } from '@/store/entities/project';

type Props = {
  projectId: string;
};

export const TaskSectionName = memo(function TaskSectionName(props: Props) {
  const { project } = useProject(props.projectId);

  return (
    <Box px={2} maxW={80} lineClamp={1} fontWeight="semibold">
      {project.name}
    </Box>
  );
});
