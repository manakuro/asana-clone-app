import type React from 'react';
import { memo, useCallback } from 'react';
import { ProjectChip } from '@/components/features/Chips';
import { PopoverDueDatePicker } from '@/components/features/Popovers';
import { CheckIcon } from '@/components/ui/check-icon';
import { DueDate } from '@/components/ui/due-date';
import { Flex } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useClickableHoverStyle } from '@/hooks';
import { useRouter } from '@/router';
import { formatDueTime } from '@/shared/date';
import { useProjectIdsByTaskId } from '@/store/entities/projectTask';
import { useTask } from '@/store/entities/task';

type Props = {
  taskId: string;
};

export const ListItem = memo(function ListItem(props: Props) {
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
      navigateToHomeDetail(taskId);
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
      borderColor="border"
      borderRadius="md"
      borderStyle="solid"
      px={4}
      py={2}
      h={10}
      onClick={handleClick}
      aria-label="task due soon"
      css={clickableHoverStyle}
    >
      <Flex alignItems="center" flex={1}>
        <CheckIcon completed={task.completed} onClick={handleToggleDone} />
        <Text fontSize="sm" ml={2} lineClamp={1}>
          {task.name}
        </Text>
      </Flex>
      <Flex flex="0 0 auto" alignItems="center" justifyContent="flex-end">
        <Stack direction="row" gap={2}>
          {projectIds.map((id) => (
            <ProjectChip
              variant="badge"
              projectId={id}
              key={id}
              badgeProps={{
                truncate: true,
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
            color="fg.muted"
            textAlign="right"
            dueDate={task.dueDate}
          >
            {task.dueTime && (
              <Text as="span" fontSize="xs" color="fg.muted" ml={1}>
                {formatDueTime(task.dueTime)}
              </Text>
            )}
          </DueDate>
        </PopoverDueDatePicker>
      </Flex>
    </Flex>
  );
});
