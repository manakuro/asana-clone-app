import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { Tab, TabList } from '@/components/ui/tabs';

export const Tabs = memo(function Tabs() {
  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="lg" fontWeight="semibold">
            My Tasks
          </Heading>
          <Menu.Root positioning={{ placement: 'bottom-start' }} lazyMount>
            <Menu.Trigger asChild>
              <IconButton ml={1} aria-label="expand button" variant="ghost">
                <Icon icon="chevronDown" color="fg.muted" />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="Sync to Calendar" disabled>
                    Sync to Calendar
                  </Menu.Item>
                  <Menu.Item value="Add tasks via Email" disabled>
                    Add tasks via Email
                  </Menu.Item>
                  <Menu.Item value="Export CSV" disabled>
                    Export CSV
                  </Menu.Item>
                  <Menu.Item value="Print" disabled>
                    Print
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
        <TabList bottom="2px">
          <Tab value="list">List</Tab>
          <Tab value="board">Board</Tab>
          <Tab value="calendar">Calendar</Tab>
          <Tab value="files">Files</Tab>
        </TabList>
      </Flex>
    </Flex>
  );
});
