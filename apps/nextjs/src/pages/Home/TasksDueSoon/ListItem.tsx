import type React from 'react';
import { memo, useCallback } from 'react';
import { ProjectChip } from 'src/components/features/molecules/Chips';
import { PopoverDueDatePicker } from 'src/components/features/organisms/Popovers';
import { CheckIcon, DueDate, Flex, Stack, Text } from 'src/components/ui/atoms';
import { useClickableHoverStyle } from 'src/hooks';
import { useRouter } from 'src/router';
import { formatDueTime } from 'src/shared/date';
import { useProjectIdsByTaskId } from 'src/store/entities/projectTask';
import { useTask } from 'src/store/entities/task';

type Props = {
  taskId: string;
};

export const ListItem: React.FC<Props> = memo((props) => {
  const { taskId } = props;
  const { task, setTaskDueDate, setTask, resetTaskDueDate } = useTask(taskId);
  const { clickableHoverStyle } = useClickableHoverStyle();
  const { projectIds } = useProjectIdsByTaskId(taskId);
  const { navigateToHomeDetail } = useRouter();

  const handleChange = useCallback(
    async (date: Date) => {
      await setTaskDueDate(date);
    },
    [setTaskDueDate],
  );

  const handleClear = useCallback(async () => {
    await resetTaskDueDate();
  }, [resetTaskDueDate]);

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      await navigateToHomeDetail(taskId);
    },
    [navigateToHomeDetail, taskId],
  );

  const handleToggleDone = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      await setTask({ completed: !task.completed });
    },
    [setTask, task.completed],
  );

  return (
    <Flex
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      px={4}
      py={2}
      h={10}
      onClick={handleClick}
      aria-label="task due soon"
      {...clickableHoverStyle}
    >
      <Flex alignItems="center" flex={1}>
        <CheckIcon completed={task.completed} onClick={handleToggleDone} />
        <Text fontSize="sm" ml={2} noOfLines={1}>
          {task.name}
        </Text>
      </Flex>
      <Flex flex="0 0 auto" alignItems="center" justifyContent="flex-end">
        <Stack direction="row" spacing={2}>
          {projectIds.map((id) => (
            <ProjectChip
              variant="badge"
              projectId={id}
              key={id}
              badgeProps={{
                noOfLines: 1,
                maxW: 20,
              }}
            />
          ))}
        </Stack>
        <PopoverDueDatePicker
          date={task.dueDate}
          time={task.dueTime}
          onChange={handleChange}
          onClear={handleClear}
        >
          <DueDate
            ml={2}
            fontSize="xs"
            color="text.muted"
            textAlign="right"
            dueDate={task.dueDate}
          >
            {task.dueTime && (
              <Text as="span" fontSize="xs" color="text.muted" ml={1}>
                {formatDueTime(task.dueTime)}
              </Text>
            )}
          </DueDate>
        </PopoverDueDatePicker>
      </Flex>
    </Flex>
  );
});
ListItem.displayName = 'ListItem';
