import { memo, useCallback, useMemo } from 'react';
import {
  useTasksTask,
  useTasksTaskSectionCommand,
  useTasksTaskSectionIds,
} from '@/components/features/Tasks/hooks';
import { Button } from '@/components/ui/button';
import {
  ButtonGroup,
  type ButtonGroupProps,
} from '@/components/ui/button-group';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import type { SystemStyleObject } from '@/shared/chakra';

type Props = ButtonGroupProps & {
  solid?: boolean;
  outlined?: boolean;
};

export const AddTaskButton = memo(function AddTaskButton(props: Props) {
  const { solid, outlined: _, ...rest } = props;
  const { addTaskSection } = useTasksTaskSectionCommand();
  const { taskSectionIds } = useTasksTaskSectionIds();
  const firstTaskSectionId = useMemo(() => taskSectionIds[0], [taskSectionIds]);
  const { addTask } = useTasksTask();

  const handleAddTask = useCallback(async () => {
    await addTask({ taskSectionId: firstTaskSectionId });
  }, [addTask, firstTaskSectionId]);

  const buttonGroupProps: ButtonGroupProps = solid
    ? { variant: 'solid', colorPalette: 'teal' }
    : { variant: 'outline' };
  const iconStyle: SystemStyleObject = solid
    ? { color: 'white' }
    : { color: 'fg.muted' };

  const handleAddTaskSection = useCallback(async () => {
    await addTaskSection();
  }, [addTaskSection]);

  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }} lazyMount>
      <ButtonGroup size="xs" attached {...buttonGroupProps} {...rest}>
        <Button onClick={handleAddTask}>
          <Icon icon="plus" {...iconStyle} />
          Add task
        </Button>
        <Menu.Trigger asChild>
          <IconButton aria-label="Add to task">
            <Icon icon="chevronDown" {...iconStyle} />
          </IconButton>
        </Menu.Trigger>
      </ButtonGroup>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item onClick={handleAddTaskSection} value="Add section">
              Add section
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
});
