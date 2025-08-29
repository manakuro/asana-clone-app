import type { ButtonProps, IconProps } from '@/components/ui/atoms';
import { DatePickerWithInput } from '@/components/ui/molecules';
import { useProject, useProjectCommand } from '@/store/entities/project';
import { memo, useCallback } from 'react';

type Props = {
  projectId: string;
  buttonStyle?: ButtonProps;
  iconStyle?: Omit<IconProps, 'icon'>;
};

export const ProjectDueDate = memo(function ProjectDueDate(props: Props) {
  const { projectId, buttonStyle, iconStyle } = props;
  const { project } = useProject(projectId);
  const { setProject } = useProjectCommand();

  const handleSelect = useCallback(
    async (val: Date) => {
      await setProject({ dueDate: val.toISOString(), projectId });
    },
    [projectId, setProject],
  );

  const handleDelete = useCallback(async () => {
    await setProject({ dueDate: '', projectId });
  }, [projectId, setProject]);

  return (
    <DatePickerWithInput
      onSelect={handleSelect}
      onDelete={handleDelete}
      dueDate={project.dueDate}
      buttonStyle={buttonStyle}
      iconStyle={iconStyle}
    />
  );
});
