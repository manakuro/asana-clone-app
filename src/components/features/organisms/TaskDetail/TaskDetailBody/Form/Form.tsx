import { memo } from 'react'
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail'
import { Flex, Stack } from 'src/components/ui/atoms'
import { Assignee } from './Assignee'
import { Attachment } from './Attachment'
import { Description } from './Description'
import { DueDate } from './DueDate'
import { FeedList } from './FeedList'
import { ParentTask } from './ParentTask'
import { Projects } from './Projects'
import { Subtasks } from './Subtasks'
import { TaskName } from './TaskName'

export const Form = memo(function Form() {
  const { taskId } = useTaskDetail()

  return (
    <Flex flexDirection="column" pt={2} flex={1}>
      <ParentTask taskId={taskId} />
      <TaskName taskId={taskId} />
      <Stack px={6} mt={3}>
        <Assignee taskId={taskId} />
        <DueDate taskId={taskId} />
        <Projects taskId={taskId} />
        <Description taskId={taskId} />
        <Subtasks taskParentId={taskId} />
        <Attachment taskId={taskId} />
      </Stack>
      <FeedList taskId={taskId} />
    </Flex>
  )
})
