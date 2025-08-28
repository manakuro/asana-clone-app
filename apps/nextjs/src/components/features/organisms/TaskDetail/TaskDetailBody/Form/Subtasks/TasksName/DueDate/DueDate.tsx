import { PopoverDueDatePicker } from '@/components/features/organisms/Popovers';
import { DueDate as AtomsDueDate, Icon } from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules';
import { useClickableHoverStyle } from '@/hooks';
import { getDifferenceInDays } from '@/shared/date';
import { useTask } from '@/store/entities/task';
import { memo, useCallback } from 'react';
import { useDueDate } from './useDueDate';

type Props = {
  taskId: string;
};

export const DueDate = memo(function DueDate(props: Props) {
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { onDueDateOpened, onDueDateClosed, showIcon } = useDueDate();
  const { task, setTaskDueDate, resetTaskDueDate } = useTask(props.taskId);

  const handleChange = useCallback(
    async (date: Date) => {
      await setTaskDueDate(date);
    },
    [setTaskDueDate],
  );

  const handleClear = useCallback(async () => {
    await resetTaskDueDate();
  }, [resetTaskDueDate]);

  return (
    <PopoverDueDatePicker
      date={task.dueDate}
      time={task.dueTime}
      onChange={handleChange}
      onClear={handleClear}
      onOpened={onDueDateOpened}
      onClosed={onDueDateClosed}
    >
      {task.dueDate ? (
        <Tooltip
          hasArrow
          label={`Due in ${getDifferenceInDays(
            new Date(task.dueDate),
            new Date(),
          )} days`}
          aria-label="Due date"
          size="sm"
          withIcon
        >
          <AtomsDueDate ml={2} fontSize="xs" dueDate={task.dueDate} />
        </Tooltip>
      ) : (
        <Tooltip
          hasArrow
          label="Add a due date to this subtask"
          aria-label="Due date"
          size="sm"
          withIcon
        >
          <Icon
            visibility={showIcon ? 'visible' : 'hidden'}
            pointerEvents={showIcon ? 'auto' : 'none'}
            icon="calendarAlt"
            color="text.muted"
            {...clickableHoverLightStyle}
          />
        </Tooltip>
      )}
    </PopoverDueDatePicker>
  );
});
