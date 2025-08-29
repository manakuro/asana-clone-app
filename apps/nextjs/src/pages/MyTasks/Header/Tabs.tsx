import { Flex, Heading, Icon, IconButton, Portal } from '@/components/ui/atoms';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@/components/ui/organisms/Menu';
import { Tab, TabList } from '@/components/ui/organisms/Tabs';
import { memo } from 'react';

export const Tabs = memo(function Tabs() {
  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            My Tasks
          </Heading>
          <Menu placement="bottom-start">
            <MenuButton
              ml={1}
              aria-label="expand button"
              as={IconButton}
              icon={<Icon icon="chevronDown" color="text.muted" />}
              variant="ghost"
            />
            <Portal>
              <MenuList color="text.base">
                <MenuItem>Sync to Calendar</MenuItem>
                <MenuItem>Add tasks via Email</MenuItem>
                <MenuItem>Export CSV</MenuItem>
                <MenuItem>Print</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
        <TabList>
          <Tab>List</Tab>
          <Tab>Board</Tab>
          <Tab>Calendar</Tab>
          <Tab>Files</Tab>
        </TabList>
      </Flex>
    </Flex>
  );
});
