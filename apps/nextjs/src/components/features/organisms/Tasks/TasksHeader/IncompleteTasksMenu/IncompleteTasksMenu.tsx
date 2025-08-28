import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from '@/components/features/organisms/Menus';
import { useTasksTaskListStatus } from '@/components/features/organisms/Tasks/hooks';
import { Button, Flex, Icon, Text } from '@/components/ui/atoms';
import { MenuItemOption } from '@/components/ui/organisms/Menu';
import { useDisclosure } from '@/shared/chakra';
import {
  TaskListCompletedStatusCode,
  type TaskListCompletedStatusCodeValue,
  useTaskListCompletedStatus,
} from '@/store/entities/taskListCompletedStatus';
import { memo, useCallback, useMemo } from 'react';
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
      placement="bottom-end"
    >
      {({ listStatus, onChange, onClose }) => (
        <>
          <MenuSelectButton
            variant="ghost"
            aria-label="Task list status"
            as={Button}
            leftIcon={<Icon icon="checkCircle" />}
            size="xs"
          >
            {buttonText}
          </MenuSelectButton>
          <MenuSelectList
            defaultValue={taskListStatus.taskListCompletedStatus.toString()}
          >
            <MenuItemOption value={TaskListCompletedStatusCode.Incomplete}>
              <Flex onMouseEnter={popoverDisclosure.onClose}>
                Incomplete tasks
              </Flex>
            </MenuItemOption>
            <MenuItemOption>
              <Flex onMouseEnter={popoverDisclosure.onOpen}>
                <PopoverCompletedTasks
                  isOpen={popoverDisclosure.isOpen}
                  placement="left-start"
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
            </MenuItemOption>
            <MenuItemOption value={TaskListCompletedStatusCode.All}>
              <Flex onMouseEnter={popoverDisclosure.onClose}>All tasks</Flex>
            </MenuItemOption>
          </MenuSelectList>
        </>
      )}
    </MenuSelect>
  );
});
