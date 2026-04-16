import { memo, useCallback, useMemo } from 'react';
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from '@/components/features/Menus';
import { useTasksTaskListStatus } from '@/components/features/Tasks/hooks';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { Text } from '@/components/ui/Text';
import { useDisclosure } from '@/shared/chakra';
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
  const popoverDisclosure = useDisclosure();

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
    >
      {({ listStatus, onChange, onClose }) => (
        <>
          <MenuSelectButton
            variant="ghost"
            aria-label="Task list status"
            size="xs"
          >
            <Icon icon="checkCircle" />
            {buttonText}
          </MenuSelectButton>
          <MenuSelectList
            defaultValue={taskListStatus.taskListCompletedStatus.toString()}
          >
            <Menu.RadioItem value={TaskListCompletedStatusCode.Incomplete}>
              <Flex onMouseEnter={popoverDisclosure.onClose}>
                Incomplete tasks
              </Flex>
            </Menu.RadioItem>
            <Flex onMouseEnter={popoverDisclosure.onOpen}>
              <PopoverCompletedTasks
                open={popoverDisclosure.open}
                positioning={{ placement: 'left-start' }}
                onClose={() => {
                  popoverDisclosure.onClose();
                  onClose();
                }}
                listStatus={listStatus}
                onChange={onChange}
              >
                <Flex flex={1}>
                  <Text fontSize="sm" flex={1}>
                    Completed tasks
                  </Text>
                  <Icon icon="chevronRight" />
                </Flex>
              </PopoverCompletedTasks>
            </Flex>
            <Menu.RadioItem value={TaskListCompletedStatusCode.All}>
              <Flex onMouseEnter={popoverDisclosure.onClose}>All tasks</Flex>
            </Menu.RadioItem>
          </MenuSelectList>
        </>
      )}
    </MenuSelect>
  );
});
