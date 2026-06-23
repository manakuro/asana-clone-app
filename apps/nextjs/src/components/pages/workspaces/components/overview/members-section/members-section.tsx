import { memo } from 'react';
import { Flex } from '@/components/ui/flex';
import { useWorkspace } from '@/store/entities/workspace';
import { useTeammateIdsByWorkspaceId } from '@/store/entities/workspaceTeammate';
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
} from '../overview-section-header';
import { AddMemberListItem } from './add-member-list-item';
import { MemberListItem } from './member-list-item';

export const MembersSection = memo(function MembersSection() {
  const { workspace } = useWorkspace();
  const { teammateIds } = useTeammateIdsByWorkspaceId(workspace.id);

  return (
    <Flex flexDirection="column" mt={8} minH="300px">
      <OverviewSectionHeader>
        <OverviewSectionHeaderHeading>Members</OverviewSectionHeaderHeading>
      </OverviewSectionHeader>
      <Flex flexDirection="column" minH="245px">
        <AddMemberListItem />
        {teammateIds.map((id) => (
          <MemberListItem teammateId={id} key={id} />
        ))}
      </Flex>
    </Flex>
  );
});
