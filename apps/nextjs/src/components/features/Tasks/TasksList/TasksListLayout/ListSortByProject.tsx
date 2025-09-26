import { TasksListSectionGroupByProject } from '@/components/features/Tasks';
import { useTasksListContext } from '@/components/features/Tasks/TasksList/Provider';
import { TasksListItem } from '@/components/features/Tasks/TasksList/TasksListItem';
import { TasksListSectionProvider } from '@/components/features/Tasks/TasksList/TasksListSection';
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { useMyTasksProjectIds } from '@/store/app/myTasks/projects';
import { useMyTasksTaskIdsWithNoProject } from '@/store/app/myTasks/tasks';
import type React from 'react';
import { memo, useCallback, useState } from 'react';

export const ListSortByProject: React.FC = memo(() => {
  const { projectIds } = useMyTasksProjectIds();
  const { taskIds } = useMyTasksTaskIdsWithNoProject();
  const { stickyStyle } = useTasksListContext();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s);
  }, []);

  return (
    <Flex flexDirection="column">
      {projectIds.map((id) => (
        <TasksListSectionGroupByProject projectId={id} key={id} />
      ))}
      <Flex>
        <Flex alignItems="center" mt={6} pl={6} {...stickyStyle}>
          <IconButton
            aria-label="Task list expand button"
            icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
            variant="ghost"
            onClick={handleToggle}
          />
          <Box px={2} fontWeight="semibold">
            No Project
          </Box>
        </Flex>
      </Flex>
      {isExpanded && (
        <Flex flexDirection="column">
          {taskIds.map((id) => (
            <TasksListSectionProvider key={id} taskSectionId="">
              <TasksListItem taskId={id} />
            </TasksListSectionProvider>
          ))}
        </Flex>
      )}
    </Flex>
  );
});
