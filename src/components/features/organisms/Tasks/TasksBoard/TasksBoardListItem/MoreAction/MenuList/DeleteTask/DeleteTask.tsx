import type React from 'react'
import { memo, useCallback } from 'react'
import { Icon } from 'src/components/ui/atoms'
import { MenuItem } from 'src/components/ui/organisms/Menu'
import { useToast } from 'src/hooks'
import { useTask, useTaskCommand } from 'src/store/entities/task'

type Props = {
  onMouseEnter: () => void
  taskId: string
}
export const DeleteTask: React.FC<Props> = memo((props) => {
  // TODO: Fix `Can't perform a React state update on an unmounted component ...` error.
  const { onMouseEnter, taskId } = props
  const { task } = useTask(props.taskId)
  const { deleteTask, undeleteTask } = useTaskCommand()
  const { toast } = useToast()

  const handleUndo = useCallback(async () => {
    await undeleteTask({ taskId })
  }, [taskId, undeleteTask])

  const handleClick = useCallback(async () => {
    await deleteTask({ taskId })
    toast({
      description: `${task.name} was deleted`,
      undo: handleUndo,
      duration: 10000,
    })
  }, [deleteTask, taskId, toast, task.name, handleUndo])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="trash" color="alert" />}
      color="alert"
      onClick={handleClick}
    >
      Delete task
    </MenuItem>
  )
})

DeleteTask.displayName = 'DeleteTask'
