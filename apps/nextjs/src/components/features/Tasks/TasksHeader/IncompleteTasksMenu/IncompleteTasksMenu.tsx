import { memo, useCallback, useMemo } from 'react';
import {
  MenuSelect,
  MenuSelectList,
  MenuSelectTrigger,
} from '@/components/features/Menus';
import { useTasksTaskListStatus } from '@/components/features/Tasks/hooks';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { Text } from '@/components/ui/text';
import {
  TaskListCompletedStatusCode,
  type TaskListCompletedStatusCodeValue,
  useTaskListCompletedStatus,
} from '@/store/entities/taskListCompletedStatus';
import { PopoverCompletedTasks } from './PopoverCompletedTasks';

type Props = {
  startLoading: () => void;
  endLoading: () => void;
};

export const IncompleteTasksMenu = memo(function IncompleteTasksMenu(
  props: Props,
) {
  const { startLoading, endLoading } = props;
  const { setTaskListCompletedStatus, taskListStatus } =
    useTasksTaskListStatus();
  const {
    isTaskListCompleted,
    isTaskListInComplete,
    isTaskListCompleted1Week,
    isTaskListCompleted2Weeks,
    isTaskListCompletedToday,
    isTaskListCompleted3Weeks,
    isTaskListCompletedYesterday,
    isTaskListCompletedAll,
  } = useTaskListCompletedStatus();

  const handleChange = useCallback(
    (status: TaskListCompletedStatusCodeValue) => {
      startLoading();
      setTimeout(() => {
        setTaskListCompletedStatus(status);
        endLoading();
      }, 200);
    },
    [endLoading, setTaskListCompletedStatus, startLoading],
  );

  const buttonText = useMemo<string>(() => {
    switch (true) {
      case isTaskListInComplete(taskListStatus.taskListCompletedStatus):
        return 'Incomplete tasks';
      case isTaskListCompleted(taskListStatus.taskListCompletedStatus):
      case isTaskListCompletedToday(taskListStatus.taskListCompletedStatus):
      case isTaskListCompletedYesterday(taskListStatus.taskListCompletedStatus):
      case isTaskListCompleted1Week(taskListStatus.taskListCompletedStatus):
      case isTaskListCompleted2Weeks(taskListStatus.taskListCompletedStatus):
      case isTaskListCompleted3Weeks(taskListStatus.taskListCompletedStatus):
        return 'Completed tasks';
      case isTaskListCompletedAll(taskListStatus.taskListCompletedStatus):
        return 'All tasks';
      default:
        return '';
    }
  }, [
    isTaskListCompleted,
    isTaskListCompleted1Week,
    isTaskListCompleted2Weeks,
    isTaskListCompleted3Weeks,
    isTaskListCompletedAll,
    isTaskListCompletedToday,
    isTaskListCompletedYesterday,
    isTaskListInComplete,
    taskListStatus.taskListCompletedStatus,
  ]);

  return (
    <MenuSelect<TaskListCompletedStatusCodeValue>
      onChange={handleChange}
      positioning={{ placement: 'bottom-end' }}
      listStatus={taskListStatus.taskListCompletedStatus}
    >
      {({ listStatus, onChange }) => (
        <>
          <MenuSelectTrigger>
            <Button variant="ghost" aria-label="Task list status" size="xs">
              <Icon icon="checkCircle" />
              {buttonText}
            </Button>
          </MenuSelectTrigger>
          <MenuSelectList>
            <Menu.RadioItem value={TaskListCompletedStatusCode.Incomplete}>
              Incomplete tasks
              <Menu.ItemIndicator />
            </Menu.RadioItem>
            <PopoverCompletedTasks listStatus={listStatus} onChange={onChange}>
              <Flex flex={1} pl={8}>
                <Text fontSize="sm" flex={1}>
                  Completed tasks
                </Text>
                <Icon icon="chevronRight" />
              </Flex>
            </PopoverCompletedTasks>
            <Menu.RadioItem value={TaskListCompletedStatusCode.All}>
              All tasks
              <Menu.ItemIndicator />
            </Menu.RadioItem>
          </MenuSelectList>
        </>
      )}
    </MenuSelect>
  );
});
