import { dateFns } from '@/shared/dateFns';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useProject } from '@/store/entities/project';
import { useMemo } from 'react';

type Props = {
  dateString: string;
};

export const useProjectDueDate = (props: Props) => {
  const { dateString } = props;
  const { projectId } = useProjectsProjectId();
  const { project } = useProject(projectId);
  const isProjectDueDate = useMemo(() => {
    return dateFns.isSameDay(new Date(dateString), new Date(project.dueDate));
  }, [dateString, project.dueDate]);

  return {
    isProjectDueDate,
  };
};
