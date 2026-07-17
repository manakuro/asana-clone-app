import { isSameDay } from 'date-fns';
import { useMemo } from 'react';
import { useProjectsProjectId } from '@/components/pages/projects/index/store/projects/project';
import { useProject } from '@/features/project/store/project';

type Props = {
  dateString: string;
};

export const useProjectDueDate = (props: Props) => {
  const { dateString } = props;
  const { projectId } = useProjectsProjectId();
  const { project } = useProject(projectId);
  const isProjectDueDate = useMemo(() => {
    return isSameDay(new Date(dateString), new Date(project.dueDate));
  }, [dateString, project.dueDate]);

  return {
    isProjectDueDate,
  };
};
