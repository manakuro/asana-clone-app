import { Flex, Heading } from '@/components/ui/atoms';
import { Tab, TabList } from '@/components/ui/organisms/Tabs';
import { memo } from 'react';

export const Tabs = memo(function Tabs() {
  return (
    <Flex mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            Inbox
          </Heading>
        </Flex>
        <TabList>
          <Tab>Activity</Tab>
          <Tab>Archive</Tab>
        </TabList>
      </Flex>
    </Flex>
  );
});
