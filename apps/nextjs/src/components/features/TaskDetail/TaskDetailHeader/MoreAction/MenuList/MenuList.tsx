import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { Text } from '@/components/ui/text';
import { AddToAnotherProject } from './AddToAnotherProject';
import { DeleteTask } from './DeleteTask';
import { PopoverAdvancedActions } from './PopoverAdvancedActions';
import { Print } from './Print';

type Props = {
  taskId: string;
};

export function MenuList(props: Props) {
  return (
    <Menu.Positioner>
      <Menu.Content zIndex={1}>
        <Menu.Item disabled value="Full screen">
          <Icon icon="fullscreenOutline" color="fg.muted" />
          Full screen
          <Menu.ItemCommand>Tab+X</Menu.ItemCommand>
        </Menu.Item>
        <AddToAnotherProject />
        <Menu.Item disabled value="Mark as Milestone">
          <Icon icon="squareRounded" color="fg.muted" />
          Mark as Milestone
        </Menu.Item>
        <Menu.Item disabled value="Mark as Approval">
          <Icon icon="beenHere" color="fg.muted" />
          Mark as Approval
        </Menu.Item>
        <Menu.Item disabled value="Make dependent">
          <Icon icon="gitPullRequest" color="fg.muted" />
          Make dependent
        </Menu.Item>
        <Menu.Item disabled value="Add tags">
          <Icon icon="tag" color="fg.muted" />
          Add tags
          <Menu.ItemCommand>Tab+T</Menu.ItemCommand>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item disabled value="Duplicate task">
          Duplicate task
        </Menu.Item>
        <Menu.Item disabled value="Create follow-up task">
          Create follow-up task
          <Menu.ItemCommand>⌘+Tab+N</Menu.ItemCommand>
        </Menu.Item>
        <Print />
        <PopoverAdvancedActions positioning={{ placement: 'left' }}>
          <Flex flex={1}>
            <Text fontSize="sm" flex={1}>
              Advanced actions
            </Text>
            <Icon icon="chevronRight" />
          </Flex>
        </PopoverAdvancedActions>
        <Menu.Separator />
        <DeleteTask taskId={props.taskId} />
      </Menu.Content>
    </Menu.Positioner>
  );
}
