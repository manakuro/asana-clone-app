import { useCallback } from 'react';
import { Menu, type MenuRootProps } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import {
  TaskListCompletedStatusCode,
  type TaskListCompletedStatusCodeValue,
} from '@/store/entities/taskListCompletedStatus';

type Props = {
  listStatus?: TaskListCompletedStatusCodeValue;
  onChange: (listStatus: TaskListCompletedStatusCodeValue) => void;
} & MenuRootProps;

export function PopoverCompletedTasks({
  listStatus,
  onChange,
  children,
  ...rest
}: Props) {
  const handleChange = useCallback(
    (listStatus?: string | string[]) => {
      onChange(listStatus as TaskListCompletedStatusCodeValue);
    },
    [onChange],
  );

  return (
    <Menu.Root lazyMount {...rest}>
      <Menu.TriggerItem asChild>{children}</Menu.TriggerItem>
      <Portal>
        <Menu.Positioner>
          <Menu.Content animation="none">
            <Menu.RadioItemGroup
              value={listStatus}
              onValueChange={(e) => handleChange(e.value)}
            >
              <Menu.RadioItem value={TaskListCompletedStatusCode.Completed}>
                All Completed Tasks
                <Menu.ItemIndicator />
              </Menu.RadioItem>
              <Menu.RadioItem
                value={TaskListCompletedStatusCode.CompletedToday}
              >
                Today
                <Menu.ItemIndicator />
              </Menu.RadioItem>
              <Menu.RadioItem
                value={TaskListCompletedStatusCode.CompletedYesterday}
              >
                Yesterday
                <Menu.ItemIndicator />
              </Menu.RadioItem>
              <Menu.RadioItem
                value={TaskListCompletedStatusCode.Completed_1Week}
              >
                1 week
                <Menu.ItemIndicator />
              </Menu.RadioItem>
              <Menu.RadioItem
                value={TaskListCompletedStatusCode.Completed_2Weeks}
              >
                2 weeks
                <Menu.ItemIndicator />
              </Menu.RadioItem>
              <Menu.RadioItem
                value={TaskListCompletedStatusCode.Completed_3Weeks}
              >
                3 weeks
                <Menu.ItemIndicator />
              </Menu.RadioItem>
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
