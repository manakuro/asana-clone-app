import { useProjectsProjectId } from '@/store/app/projects/project';
import { memo } from 'react';
import { DueDate } from './DueDate';
import { JoinedTeammates } from './JoinedTeammates';
import { ProjectCreated } from './ProjectCreated';

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
