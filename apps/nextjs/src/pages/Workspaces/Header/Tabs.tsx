import { Flex, Heading } from '@/components/ui/atoms';
import { Tab, TabList } from '@/components/ui/organisms/Tabs';
import { useWorkspace } from '@/store/entities/workspace';
import { memo } from 'react';
import { FavoriteButton } from './FavoriteButton';

export const Tabs = memo(function Tabs() {
  const { workspace } = useWorkspace();

  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            {workspace.name}
          </Heading>
          <FavoriteButton ml={2} />
        </Flex>
        <TabList>
          <Tab>Overview</Tab>
          <Tab isDisabled cursor="auto !important">
            Messages
          </Tab>
          <Tab isDisabled cursor="auto !important">
            Calendar
          </Tab>
        </TabList>
      </Flex>
    </Flex>
  );
});
