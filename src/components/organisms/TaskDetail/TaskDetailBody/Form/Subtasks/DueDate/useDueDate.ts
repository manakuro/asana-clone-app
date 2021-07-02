import { useCallback, useMemo, useState } from 'react'
import { useTasksNameContext } from 'src/components/organisms/Tasks/TasksList/TasksListCells'

export type UseDueDate = {
  onDueDateOpened: () => void
  onDueDateClosed: () => void
  dueDateFocused: boolean
  showIcon: boolean
}
export const useDueDate = (): UseDueDate => {
  const { isHovering } = useTasksNameContext()
  const [focused, setFocused] = useState(false)

  const onDueDateOpened = useCallback(() => {
    setFocused(true)
  }, [])

  const onDueDateClosed = useCallback(() => {
    setFocused(false)
  }, [])

  const showIcon = useMemo(() => isHovering || focused, [isHovering, focused])

  return {
    onDueDateOpened,
    onDueDateClosed,
    dueDateFocused: focused,
    showIcon,
  }
}
