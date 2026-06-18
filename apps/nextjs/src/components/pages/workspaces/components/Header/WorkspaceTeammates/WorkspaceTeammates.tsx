import { memo } from 'react';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { AvatarGroup } from '@/components/ui/avatar';
import { Flex } from '@/components/ui/flex';
import { useWorkspace } from '@/store/entities/workspace';
import { useTeammateIdsByWorkspaceId } from '@/store/entities/workspaceTeammate';

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
