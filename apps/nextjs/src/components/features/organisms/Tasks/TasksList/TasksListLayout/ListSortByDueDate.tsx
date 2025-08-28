import { TasksListSection } from '@/components/features/organisms/Tasks';
import { useTasksListContext } from '@/components/features/organisms/Tasks/TasksList/Provider';
import { TasksListItem } from '@/components/features/organisms/Tasks/TasksList/TasksListItem';
import { TasksListSectionProvider } from '@/components/features/organisms/Tasks/TasksList/TasksListSection';
import {
  useTasksTaskIds,
  useTasksTaskSectionIds,
} from '@/components/features/organisms/Tasks/hooks';
import { Box, Flex, Icon, IconButton } from '@/components/ui/atoms';
import type React from 'react';
import { memo, useCallback, useState } from 'react';

export const ListSortByDueDate: React.FC = memo(() => {
  const { taskIds } = useTasksTaskIds();
  const { taskSectionIds } = useTasksTaskSectionIds();
  const [isExpanded, setIsExpanded] = useState(true);
  const { stickyStyle } = useTasksListContext();

  const handleToggle = useCallback(() => {
    setIsExpanded((s) => !s);
  }, []);

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        {taskIds.map((id) => (
          <TasksListSectionProvider key={id} taskSectionId="">
            <TasksListItem taskId={id} />
          </TasksListSectionProvider>
        ))}
      </Flex>
      <Flex>
        <Flex alignItems="center" mt={6} pl={6} {...stickyStyle}>
          <IconButton
            aria-label="Task list expand button"
            icon={<Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />}
            variant="ghost"
            onClick={handleToggle}
          />
          <Box px={2} fontWeight="semibold">
            No Due Date
          </Box>
        </Flex>
      </Flex>
      {isExpanded && (
        <Flex flexDirection="column">
          {taskSectionIds.map((id, i) => (
            <TasksListSection
              indented
              taskSectionId={id}
              key={id}
              showAddButton={taskSectionIds.length === i + 1}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
});
