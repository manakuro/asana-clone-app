import { memo } from 'react'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { DueDate } from './DueDate'
import { JoinedTeammates } from './JoinedTeammates'
import { ProjectCreated } from './ProjectCreated'

export const OverviewTimeline = memo(function OverviewTimeline() {
  const { projectId } = useProjectsProjectId()

  return (
    <>
      <DueDate projectId={projectId} />
      <JoinedTeammates projectId={projectId} />
      <ProjectCreated projectId={projectId} />
    </>
  )
})
