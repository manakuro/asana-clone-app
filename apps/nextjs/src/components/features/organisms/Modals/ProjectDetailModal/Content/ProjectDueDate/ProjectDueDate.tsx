import { DatePickerWithInput } from '@/components/ui/molecules';
import { useProject, useProjectCommand } from '@/store/entities/project';
import { memo, useCallback } from 'react';

type Props = {
  projectId: string;
};

export const ProjectDueDate = memo(function ProjectDueDate(props: Props) {
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { setProjectDueDate, resetProjectDueDate } = useProjectCommand();

  const handleSelect = useCallback(
    async (val: Date) => {
      await setProjectDueDate({ dueDate: val, projectId });
    },
    [setProjectDueDate, projectId],
  );

  const handleDelete = useCallback(async () => {
    await resetProjectDueDate({ projectId });
  }, [resetProjectDueDate, projectId]);

  return (
    <DatePickerWithInput
      onSelect={handleSelect}
      onDelete={handleDelete}
      dueDate={project.dueDate}
    />
  );
});
