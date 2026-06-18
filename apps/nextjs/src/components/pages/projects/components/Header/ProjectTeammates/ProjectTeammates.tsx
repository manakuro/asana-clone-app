import { memo, type Ref, useCallback } from 'react';
import { useShareProjectModal } from '@/components/features/Modals/ShareProjectModal';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { AvatarGroup } from '@/components/ui/avatar';
import { Flex } from '@/components/ui/flex';
import { Tooltip } from '@/components/ui/tooltip';
import { useTooltip } from '@/components/ui/tooltip/use-tooltip';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useTeammateIdsByProjectId } from '@/store/entities/projectTeammate';
import { useWorkspace } from '@/store/entities/workspace';
import { transitions } from '@/styles/transitions';

export const ProjectTeammates = memo(function ProjectTeammates() {
  const { projectId } = useProjectsProjectId();
  const { teammateIds } = useTeammateIdsByProjectId(projectId);
  const { open, ref } = useTooltip();
  const { onOpen, setProjectId, setMembersTab } = useShareProjectModal();
  const { workspace } = useWorkspace();

  const handleClick = useCallback(() => {
    setProjectId(projectId);
    setMembersTab();
    onOpen();
  }, [setProjectId, projectId, setMembersTab, onOpen]);

  return (
    <Flex alignItems="center">
      <Tooltip
        open={open}
        showArrow
        content={`Members of this ${workspace.name} team can find this project`}
        aria-label="A share button description"
        size="md"
      >
        <AvatarGroup
          ref={ref as Ref<HTMLDivElement>}
          size="xs"
          fontSize="xs"
          cursor="pointer"
          spaceX={-1}
          opacity={0.8}
          transition={transitions.base()}
          _hover={{ opacity: 1 }}
          onClick={handleClick}
        >
          {teammateIds.slice(0, 3).map((id) => (
            <TeammateAvatar teammateId={id} key={id} showProfile={false} />
          ))}
        </AvatarGroup>
      </Tooltip>
    </Flex>
  );
});
