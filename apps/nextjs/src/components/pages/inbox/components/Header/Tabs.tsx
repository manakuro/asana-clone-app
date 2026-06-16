import { memo } from 'react';
import { Flex } from '@/components/ui/Flex';
import { Heading } from '@/components/ui/Heading';
import { Tab, TabList } from '@/components/ui/Tabs';

export const Tabs = memo(function Tabs() {
  return (
    <Flex mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="lg" fontWeight="semibold">
            Inbox
          </Heading>
        </Flex>
        <TabList bottom="-1px">
          <Tab value="activity">Activity</Tab>
          <Tab value="archive">Archive</Tab>
        </TabList>
      </Flex>
    </Flex>
  );
});
