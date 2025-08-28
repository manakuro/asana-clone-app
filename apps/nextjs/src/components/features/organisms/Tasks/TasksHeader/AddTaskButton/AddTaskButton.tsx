import {
  useTasksTask,
  useTasksTaskSectionCommand,
  useTasksTaskSectionIds,
} from '@/components/features/organisms/Tasks/hooks';
import {
  Button,
  ButtonGroup,
  type ButtonGroupProps,
  Divider,
  Icon,
  IconButton,
  Portal,
} from '@/components/ui/atoms';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@/components/ui/organisms/Menu';
import type { ChakraProps } from '@/shared/chakra';
import { memo, useCallback, useMemo } from 'react';

type Props = ButtonGroupProps & {
  solid?: boolean;
  outlined?: boolean;
};

export const AddTaskButton = memo(function AddTaskButton(props: Props) {
  const { solid, outlined, ...rest } = props;
  const { addTaskSection } = useTasksTaskSectionCommand();
  const { taskSectionIds } = useTasksTaskSectionIds();
  const firstTaskSectionId = useMemo(() => taskSectionIds[0], [taskSectionIds]);
  const { addTask } = useTasksTask();

  const handleAddTask = useCallback(() => {
    addTask({ taskSectionId: firstTaskSectionId });
  }, [addTask, firstTaskSectionId]);

  const buttonGroupProps: ButtonGroupProps = props.solid
    ? { variant: 'solid', colorScheme: 'teal' }
    : { variant: 'outline' };
  const iconStyle: ChakraProps = props.solid
    ? { color: 'white' }
    : { color: 'text.muted' };

  const handleAddTaskSection = useCallback(() => {
    addTaskSection();
  }, [addTaskSection]);

  return (
    <ButtonGroup size="xs" isAttached {...buttonGroupProps} {...rest}>
      <Button
        mr="-px"
        borderRightRadius="none"
        leftIcon={<Icon icon="plus" {...iconStyle} />}
        onClick={handleAddTask}
      >
        Add task
      </Button>
      {props.solid && <Divider orientation="vertical" />}
      <Menu placement="bottom-start">
        <MenuButton
          borderLeftRadius="none"
          aria-label="Add to task"
          h="auto"
          as={IconButton}
          icon={<Icon icon="chevronDown" {...iconStyle} />}
        />
        <Portal>
          <MenuList color="text.base">
            <MenuItem onClick={handleAddTaskSection}>Add section</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </ButtonGroup>
  );
});
