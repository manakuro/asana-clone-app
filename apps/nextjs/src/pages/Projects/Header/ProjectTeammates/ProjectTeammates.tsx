import { memo, useCallback } from 'react';
import { useShareProjectModal } from 'src/components/features/organisms/Modals/ShareProjectModal';
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar';
import { AvatarGroup, Flex } from 'src/components/ui/atoms';
import { Tooltip } from 'src/components/ui/molecules';
import { useTooltip } from 'src/components/ui/molecules/Tooltip/useTooltip';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { useTeammateIdsByProjectId } from 'src/store/entities/projectTeammate';
import { useWorkspace } from 'src/store/entities/workspace';
import { transitions } from 'src/styles';

export const ProjectTeammates = memo(function ProjectTeammates() {
  const { projectId } = useProjectsProjectId();
  const { teammateIds } = useTeammateIdsByProjectId(projectId);
  const { isOpen, ref } = useTooltip();
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
        isOpen={isOpen}
        hasArrow
        label={`Members of this ${workspace.name} team can find this project`}
        aria-label="A share button description"
        size="md"
      >
        <AvatarGroup
          ref={ref}
          size="xs"
          max={3}
          fontSize="xs"
          cursor="pointer"
          spacing={-1}
          opacity={0.8}
          transition={transitions.base()}
          _hover={{ opacity: 1 }}
          onClick={handleClick}
        >
          {teammateIds.map((id) => (
            <TeammateAvatar teammateId={id} key={id} showProfile={false} />
          ))}
        </AvatarGroup>
      </Tooltip>
    </Flex>
  );
});
