import { Menu, type MenuRootProps } from '@/components/ui/menu';

type Props = MenuRootProps;

export function PopoverImportActions(props: Props) {
  return (
    <Menu.Root lazyMount {...props}>
      <Menu.TriggerItem w="full">{props.children}</Menu.TriggerItem>
      <Menu.Positioner>
        <Menu.Content pointerEvents="auto" ml="5px">
          <Menu.Item value="CSV" disabled>
            CSV
          </Menu.Item>
          <Menu.Item value="Email" disabled>
            Email
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
