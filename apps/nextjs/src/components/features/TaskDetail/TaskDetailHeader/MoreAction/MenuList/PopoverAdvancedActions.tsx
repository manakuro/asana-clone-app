import { Menu, type MenuRootProps } from '@/components/ui/Menu';

type Props = {
  onClose: () => void;
} & MenuRootProps;

export function PopoverAdvancedActions(props: Props) {
  return (
    <Menu.Root lazyMount {...props}>
      <Menu.TriggerItem w="full">{props.children}</Menu.TriggerItem>
      <Menu.Positioner>
        <Menu.Content pointerEvents="auto" mr="5px">
          <Menu.Item value="" disabled>
            Make a subtask of
          </Menu.Item>
          <Menu.Item value="" disabled>
            Convert to a project
          </Menu.Item>
          <Menu.Item value="" disabled>
            Merge duplicate tasks
            <Menu.ItemCommand>⇧+Tab+D</Menu.ItemCommand>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
