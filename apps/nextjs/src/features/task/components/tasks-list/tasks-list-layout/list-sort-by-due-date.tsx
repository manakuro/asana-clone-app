import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { useTasksListContext } from '@/features/task/components/tasks-list/context';
import { TasksListItem } from '@/features/task/components/tasks-list/tasks-list-item';
import { TasksListSectionContext } from '@/features/task/components/tasks-list/tasks-list-section';
import { TasksListSection } from '@/features/task/components/tasks-list/tasks-list-section/tasks-list-section';
import { useTasksTaskIds, useTasksTaskSectionIds } from '@/features/task/hooks';

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
          <TasksListSectionContext key={id} taskSectionId="">
            <TasksListItem taskId={id} />
          </TasksListSectionContext>
        ))}
      </Flex>
      <Flex>
        <Flex alignItems="center" mt={6} pl={6} css={stickyStyle}>
          <IconButton
            aria-label="Task list expand button"
            variant="ghost"
            onClick={handleToggle}
          >
            <Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />
          </IconButton>
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
