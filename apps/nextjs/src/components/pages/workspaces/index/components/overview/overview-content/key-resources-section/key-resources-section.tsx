import { Flex } from '@/components/ui/flex';
import { OverviewContentHeading } from '../overview-content-heading';
import { KeyResourcesEmpty } from './key-resources-empty';

export function KeyResourcesSection() {
  return (
    <Flex flexDirection="column" mt={8}>
      <OverviewContentHeading>Key resources</OverviewContentHeading>
      <KeyResourcesEmpty />
    </Flex>
  );
}
