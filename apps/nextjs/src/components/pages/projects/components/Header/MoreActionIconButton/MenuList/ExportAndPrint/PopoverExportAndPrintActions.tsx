import { Menu, type MenuRootProps } from '@/components/ui/menu';

type Props = MenuRootProps;

export function PopoverExportAndPrintActions(props: Props) {
  return (
    <Menu.Root lazyMount {...props}>
      <Menu.TriggerItem w="full">{props.children}</Menu.TriggerItem>
      <Menu.Positioner>
        <Menu.Content pointerEvents="auto" ml="5px">
          <Menu.Item value="Sync to calendar" disabled>
            Sync to calendar
          </Menu.Item>
          <Menu.Item value="CSV" disabled>
            CSV
          </Menu.Item>
          <Menu.Item value="JSON" disabled>
            JSON
          </Menu.Item>
          <Menu.Item value="Print" disabled>
            Print
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
