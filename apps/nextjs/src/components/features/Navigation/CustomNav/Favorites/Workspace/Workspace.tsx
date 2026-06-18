import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { WorkspaceList } from './WorkspaceList';

export const Workspace = memo(function Workspace() {
  return (
    <Flex flexDirection="column" flex={1}>
      <WorkspaceList />
    </Flex>
  );
});
