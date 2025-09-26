import { Flex } from '@/components/ui/Flex';
import { memo } from 'react';
import { WorkspaceList } from './WorkspaceList';

export const Workspace = memo(function Workspace() {
  return (
    <Flex flexDirection="column" flex={1}>
      <WorkspaceList />
    </Flex>
  );
});
