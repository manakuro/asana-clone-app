import React, { memo, useCallback } from 'react'
import { Label, Portal } from 'src/components/atoms'
import { PopoverBody, PopoverContent } from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks'
import {
  useProjectTeammate,
  useProjectTeammatesCommand,
} from 'src/store/entities/projectTeammate'
import { useTeammate } from 'src/store/entities/teammate'
import { Form } from './Form'

type Props = {
  isOpen: boolean
  onClose: () => void
  projectId: string
  projectTeammateId: string
  initialFocusRef: React.MutableRefObject<HTMLInputElement | null>
}

export const Content: React.FC<Props> = memo<Props>((props) => {
  const { projectTeammateId, initialFocusRef, onClose } = props
  const { projectTeammate, role } = useProjectTeammate(projectTeammateId)
  const { setProjectTeammateById } = useProjectTeammatesCommand()
  const { teammate } = useTeammate(projectTeammate.teammateId)

  const { ref } = useClickOutside(onClose)

  const handleChangeRole = useCallback(
    async (value: string) => {
      await setProjectTeammateById(projectTeammate.id, { role: value })
      onClose()
    },
    [projectTeammate.id, setProjectTeammateById, onClose],
  )

  return (
    <Portal>
      <PopoverContent ref={ref}>
        <PopoverBody boxShadow="md" borderRadius="md">
          <Label fontSize="xs" fontWeight="medium" color="text.muted">
            What is {teammate.name}'s role on this project?
          </Label>
          <Form
            onChange={handleChangeRole}
            defaultValue={role}
            initialFocusRef={initialFocusRef}
          />
        </PopoverBody>
      </PopoverContent>
    </Portal>
  )
})
Content.displayName = 'Content'
