import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { Text } from '@/components/ui/text';
import { PopoverMore } from './PopoverMore';

export function MenuList() {
  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="0" disabled>
            My workspace
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item value="1" disabled>
            Admin Console
          </Menu.Item>
          <PopoverMore>
            <Flex flex={1}>
              <Text fontSize="sm" flex={1}>
                More
              </Text>
              <Icon icon="chevronRight" />
            </Flex>
          </PopoverMore>
          <Menu.Separator />
          <Menu.Item value="3" asChild>
            <Link fontSize="sm" target="_blank" href="https://google.com">
              Privacy Policy
            </Link>
          </Menu.Item>
          <Menu.Item value="4" disabled>
            Logout
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}
