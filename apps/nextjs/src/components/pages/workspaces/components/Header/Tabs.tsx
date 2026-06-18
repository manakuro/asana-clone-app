import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { Heading } from '@/components/ui/heading';
import { Tab, TabList } from '@/components/ui/tabs';
import { useWorkspace } from '@/store/entities/workspace';
import { FavoriteButton } from './FavoriteButton';

export const Tabs = memo(function Tabs() {
  const { workspace } = useWorkspace();

  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="lg" fontWeight="semibold">
            {workspace.name}
          </Heading>
          <FavoriteButton ml={2} />
        </Flex>
        <TabList bottom="-1px">
          <Tab value="overview">Overview</Tab>
          <Tab disabled cursor="auto !important" value="messages">
            Messages
          </Tab>
          <Tab disabled cursor="auto !important" value="calendar">
            Calendar
          </Tab>
        </TabList>
      </Flex>
    </Flex>
  );
});
