import { memo, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { DueDate as AtomsDueDate } from '@/components/ui/due-date';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { PopoverDueDatePicker } from '@/features/task/components/popover-due-date-picker/popover-due-date-picker';
import { useTask } from '@/features/task/store/task';
import { useClickableHoverStyle } from '@/hooks/styles/use-clickable-hover-style';
import { useTasksBoardListItemContext } from '../provider';

type Props = FlexProps & {
  taskId: string;
};

export const DueDate = memo(function DueDate(props: Props) {
  const { task, setTaskDueDate, resetTaskDueDate } = useTask(props.taskId);
  const hasDueDate = useMemo(() => !!task.dueDate, [task.dueDate]);
  const { isHovering } = useTasksBoardListItemContext();
  const { clickableHoverLightStyle } = useClickableHoverStyle();

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
    <Flex onClick={(e) => e.stopPropagation()}>
      <PopoverDueDatePicker
        date={task.dueDate}
        onChange={handleChange}
        onClear={handleClear}
      >
        {!hasDueDate && (
          <Icon
            icon="calendarAlt"
            color="fg.muted"
            visibility={isHovering ? 'visible' : 'hidden'}
            {...clickableHoverLightStyle}
          />
        )}
        {hasDueDate && (
          <Button variant="ghost" h={5} minH={5} w="auto" minW="44px" px={1}>
            <AtomsDueDate fontSize="xs" dueDate={task.dueDate} />
          </Button>
        )}
      </PopoverDueDatePicker>
    </Flex>
  );
});
