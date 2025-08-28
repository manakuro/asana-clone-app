import { PopoverDueDatePicker } from '@/components/features/organisms/Popovers';
import {
  DueDate as AtomsDueDate,
  Box,
  Button,
  Icon,
} from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';
import { useHover } from '@/hooks/useHover';
import { useTask } from '@/store/entities/task';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Content, Label, Row } from '../Row';

type Props = {
  taskId: string;
};

export const DueDate = memo(function DueDate(props: Props) {
  const { task, setTaskDueDate, resetTaskDueDate } = useTask(props.taskId);
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { ref, isHovering } = useHover();
  const hasDueDate = useMemo(() => !!task.dueDate, [task.dueDate]);
  const showResetIcon = useMemo(() => hasDueDate, [hasDueDate]);

  const handleChange = useCallback(
    async (date: Date) => {
      await setTaskDueDate(date);
    },
    [setTaskDueDate],
  );

  const handleClear = useCallback(async () => {
    await resetTaskDueDate();
  }, [resetTaskDueDate]);

  const handleReset = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      await resetTaskDueDate();
    },
    [resetTaskDueDate],
  );

  return (
    <Row>
      <Label>Due date</Label>
      <Content>
        <PopoverDueDatePicker
          date={task.dueDate}
          time={task.dueTime}
          onChange={handleChange}
          onClear={handleClear}
        >
          <Button
            as={Box}
            variant="ghost"
            size="sm"
            ref={ref}
            border="1px"
            borderColor="transparent"
            cursor="pointer"
          >
            <Icon icon="calendar" color="text.muted" size="xl" />
            <AtomsDueDate ml={2} fontSize="xs" dueDate={task.dueDate} />
            {showResetIcon && (
              <Icon
                ml={2}
                mt="1px"
                icon="x"
                color="text.muted"
                size="sm"
                visibility={isHovering ? 'visible' : 'hidden'}
                {...clickableHoverLightStyle}
                onClick={handleReset}
              />
            )}
          </Button>
        </PopoverDueDatePicker>
      </Content>
    </Row>
  );
});
