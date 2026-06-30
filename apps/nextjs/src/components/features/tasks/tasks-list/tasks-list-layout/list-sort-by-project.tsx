import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { useTasksListContext } from '@/components/features/tasks/tasks-list/context';
import { TasksListItem } from '@/components/features/tasks/tasks-list/tasks-list-item';
import { TasksListSectionContext } from '@/components/features/tasks/tasks-list/tasks-list-section';
import { TasksListSectionGroupByProject } from '@/components/features/tasks/tasks-list/tasks-list-section-group-by-project/tasks-list-section-group-by-project';
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { useMyTasksProjectIds } from '@/store/app/my-tasks/projects';
import { useMyTasksTaskIdsWithNoProject } from '@/store/app/my-tasks/tasks';

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
        <Flex alignItems="center" mt={6} pl={6} css={stickyStyle}>
          <IconButton
            aria-label="Task list expand button"
            variant="ghost"
            onClick={handleToggle}
          >
            <Icon icon={isExpanded ? 'chevronDown' : 'chevronRight'} />
          </IconButton>
          <Box px={2} fontWeight="semibold">
            No Project
          </Box>
        </Flex>
      </Flex>
      {isExpanded && (
        <Flex flexDirection="column">
          {taskIds.map((id) => (
            <TasksListSectionContext key={id} taskSectionId="">
              <TasksListItem taskId={id} />
            </TasksListSectionContext>
          ))}
        </Flex>
      )}
    </Flex>
  );
});
