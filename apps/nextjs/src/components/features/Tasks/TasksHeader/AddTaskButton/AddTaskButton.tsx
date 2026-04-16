import { memo, useCallback, useMemo } from 'react';
import {
  useTasksTask,
  useTasksTaskSectionCommand,
  useTasksTaskSectionIds,
} from '@/components/features/Tasks/hooks';
import { Button } from '@/components/ui/Button';
import {
  ButtonGroup,
  type ButtonGroupProps,
} from '@/components/ui/ButtonGroup';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Menu } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import { Separator } from '@/components/ui/Separator';
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

  const handleAddTask = useCallback(() => {
    addTask({ taskSectionId: firstTaskSectionId });
  }, [addTask, firstTaskSectionId]);

  const buttonGroupProps: ButtonGroupProps = solid
    ? { variant: 'solid', colorScheme: 'teal' }
    : { variant: 'outline' };
  const iconStyle: SystemStyleObject = solid
    ? { color: 'white' }
    : { color: 'text.muted' };

  const handleAddTaskSection = useCallback(() => {
    addTaskSection();
  }, [addTaskSection]);

  return (
    <ButtonGroup size="xs" attached {...buttonGroupProps} {...rest}>
      <Button mr="-px" borderRightRadius="none" onClick={handleAddTask}>
        <Icon icon="plus" {...iconStyle} />
        Add task
      </Button>
      {props.solid && <Separator orientation="vertical" />}
      <Menu.Root positioning={{ placement: 'bottom-start' }} lazyMount>
        <Menu.Trigger asChild>
          <IconButton borderLeftRadius="none" aria-label="Add to task" h="auto">
            <Icon icon="chevronDown" {...iconStyle} />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content color="text.base">
              <Menu.Item onClick={handleAddTaskSection} value="">
                Add section
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </ButtonGroup>
  );
});
