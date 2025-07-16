import { useCallback } from 'react'
import {
  type TaskListCompletedStatuses,
  taskListCompletedStatues,
} from '../atom'
import type { TaskListCompletedStatusCodeValue } from '../types'
import { useTaskListStatus } from './useTaskListStatus'
import { useTaskListStatusCommand } from './useTaskListStatusCommand'

export const useTaskListCompletedStatus = () => {
  const { taskListStatus } = useTaskListStatus()
  const { setTaskListCompletedStatus: setStatus } = useTaskListStatusCommand()

  const isTaskListCompletedStatus = useCallback(
    (status: TaskListCompletedStatuses) =>
      taskListStatus.taskListCompletedStatus.statusCode ===
      taskListCompletedStatues[status],
    [taskListStatus.taskListCompletedStatus],
  )

  const setTaskListCompletedStatus = useCallback(
    (status: TaskListCompletedStatusCodeValue) => {
      setStatus({ statusCode: status })
    },
    [setStatus],
  )

  return {
    isTaskListCompletedStatus,
    setTaskListCompletedStatus,
  }
}
