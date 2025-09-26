import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { AvatarGroup } from '@/components/ui/Avatar';
import { Flex } from '@/components/ui/Flex';
import { useWorkspace } from '@/store/entities/workspace';
import { useTeammateIdsByWorkspaceId } from '@/store/entities/workspaceTeammate';
import { memo } from 'react';

export const WorkspaceTeammates = memo(function WorkspaceTeammates() {
  const { workspace } = useWorkspace();
  const { teammateIds } = useTeammateIdsByWorkspaceId(workspace.id);

  return (
    <Flex alignItems="center">
      <AvatarGroup size="xs" max={3} fontSize="xs" spacing={-1}>
        {teammateIds.map((id) => (
          <TeammateAvatar teammateId={id} key={id} showProfile={false} />
        ))}
      </AvatarGroup>
    </Flex>
  );
});
