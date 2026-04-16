import { Menu, type MenuRootProps } from '@/components/ui/Menu';

type Props = {
  onClose: () => void;
} & MenuRootProps;

export function PopoverExportAndPrintActions(props: Props) {
  return (
    <Menu.Root lazyMount {...props}>
      <Menu.TriggerItem w="full">{props.children}</Menu.TriggerItem>
      <Menu.Positioner>
        <Menu.Content pointerEvents="auto" ml="5px">
          <Menu.Item value="" disabled>
            Sync to calendar
          </Menu.Item>
          <Menu.Item value="" disabled>
            CSV
          </Menu.Item>
          <Menu.Item value="" disabled>
            JSON
          </Menu.Item>
          <Menu.Item value="" disabled>
            Print
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
