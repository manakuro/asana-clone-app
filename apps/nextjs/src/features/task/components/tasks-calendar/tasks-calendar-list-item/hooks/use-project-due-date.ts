import { useMemo } from 'react';
import { useProjectsProjectId } from '@/components/pages/projects/store/projects/project';
import { dateFns } from '@/lib/date-fns';
import { useProject } from '@/store/entities/project';

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
