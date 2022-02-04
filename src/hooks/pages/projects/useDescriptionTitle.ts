import { useCallback } from 'react'
import { useProject, useProjectCommand } from 'src/store/entities/project'

type Props = {
  projectId: string
}

export const useDescriptionTitle = (props: Props) => {
  const { projectId } = props
  const { project } = useProject(projectId)
  const { setProject } = useProjectCommand()

  const onChange = useCallback(
    async (val: string) => {
      await setProject({ descriptionTitle: val, projectId })
    },
    [setProject, projectId],
  )

  return {
    onChange,
    descriptionTitle: project.descriptionTitle,
  }
}
