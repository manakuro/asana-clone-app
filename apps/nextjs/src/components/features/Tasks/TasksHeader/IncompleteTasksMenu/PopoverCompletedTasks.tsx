import { useCallback } from 'react';
import { Menu, type MenuRootProps } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';
import {
  TaskListCompletedStatusCode,
  type TaskListCompletedStatusCodeValue,
} from '@/store/entities/taskListCompletedStatus';

type Props = {
  onClose: () => void;
  listStatus?: TaskListCompletedStatusCodeValue;
  onChange: (listStatus: TaskListCompletedStatusCodeValue) => void;
} & MenuRootProps;

export function PopoverCompletedTasks(props: Props) {
  const handleChange = useCallback(
    (listStatus?: string | string[]) => {
      props.onChange(listStatus as TaskListCompletedStatusCodeValue);
      props.onClose();
    },
    [props],
  );

  return (
    <Menu.Root closeOnSelect={false} lazyMount {...props}>
      <Menu.TriggerItem asChild w="full">
        {props.children}
      </Menu.TriggerItem>
      <Portal>
        <Menu.Positioner>
          <Menu.Content pointerEvents="auto" mr="30px">
            <Menu.RadioItemGroup
              value={props.listStatus}
              onValueChange={(e) => handleChange(e.value)}
            >
              <Menu.RadioItem value={TaskListCompletedStatusCode.Completed}>
                All Completed Tasks
              </Menu.RadioItem>
              <Menu.RadioItemGroup
                value={props.listStatus}
                title="Marked complete since:"
                color="text.muted"
                fontSize="xs"
                onValueChange={(e) => handleChange(e.value)}
              >
                <Menu.RadioItem
                  value={TaskListCompletedStatusCode.CompletedToday}
                >
                  Today
                </Menu.RadioItem>
                <Menu.RadioItem
                  value={TaskListCompletedStatusCode.CompletedYesterday}
                >
                  Yesterday
                </Menu.RadioItem>
                <Menu.RadioItem
                  value={TaskListCompletedStatusCode.Completed_1Week}
                >
                  1 week
                </Menu.RadioItem>
                <Menu.RadioItem
                  value={TaskListCompletedStatusCode.Completed_2Weeks}
                >
                  2 weeks
                </Menu.RadioItem>
                <Menu.RadioItem
                  value={TaskListCompletedStatusCode.Completed_3Weeks}
                >
                  3 weeks
                </Menu.RadioItem>
              </Menu.RadioItemGroup>
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
