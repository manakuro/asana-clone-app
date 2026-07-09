import type React from 'react';
import { memo, useCallback, useState } from 'react';
import { useMyTasksProjectIds } from '@/components/pages/my-tasks/index/store/my-tasks/projects';
import { useMyTasksTaskIdsWithNoProject } from '@/components/pages/my-tasks/index/store/my-tasks/tasks';
import { Box } from '@/components/ui/box';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { useTasksListContext } from '@/features/task/components/tasks-list/context';
import { TasksListItem } from '@/features/task/components/tasks-list/tasks-list-item';
import { TasksListSectionContext } from '@/features/task/components/tasks-list/tasks-list-section';
import { TasksListSectionGroupByProject } from '@/features/task/components/tasks-list/tasks-list-section-group-by-project/tasks-list-section-group-by-project';

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
