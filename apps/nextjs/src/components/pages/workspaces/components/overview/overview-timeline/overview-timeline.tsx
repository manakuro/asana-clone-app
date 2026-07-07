import { memo } from 'react';
import { useProjectsProjectId } from '@/components/pages/projects/store/projects/project';
import { DueDate } from './due-date';
import { JoinedTeammates } from './joined-teammates';
import { ProjectCreated } from './project-created';

export const OverviewTimeline = memo(function OverviewTimeline() {
  const { projectId } = useProjectsProjectId();

  return (
    <>
      <DueDate projectId={projectId} />
      <JoinedTeammates projectId={projectId} />
      <ProjectCreated projectId={projectId} />
    </>
  );
});
