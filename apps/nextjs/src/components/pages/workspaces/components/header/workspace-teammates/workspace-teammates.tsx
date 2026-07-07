import { memo } from 'react';
import { AvatarGroup } from '@/components/ui/avatar';
import { Flex } from '@/components/ui/flex';
import { TeammateAvatar } from '@/features/teammate/components/teammate-avatar';
import { useWorkspace } from '@/features/workspace/store/workspace';
import { useTeammateIdsByWorkspaceId } from '@/features/workspace/store/workspace-teammate';

export const WorkspaceTeammates = memo(function WorkspaceTeammates() {
  const { workspace } = useWorkspace();
  const { teammateIds } = useTeammateIdsByWorkspaceId(workspace.id);

  return (
    <Flex alignItems="center">
      <AvatarGroup size="xs" fontSize="xs" spaceX={-1}>
        {teammateIds.slice(0, 3).map((id) => (
          <TeammateAvatar teammateId={id} key={id} showProfile={false} />
        ))}
      </AvatarGroup>
    </Flex>
  );
});
