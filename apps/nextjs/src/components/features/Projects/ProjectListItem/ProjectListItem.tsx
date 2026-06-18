import { memo } from 'react';
import { PopoverProjectMenu } from '@/components/features/Popovers';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { AvatarGroup } from '@/components/ui/avatar';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';
import type { IconType } from '@/shared/icons';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import { useProjectIcon } from '@/store/entities/projectIcon';
import { useTeammateIdsByProjectId } from '@/store/entities/projectTeammate';
import { Container } from './Container';
import { FavoriteButton } from './FavoriteButton';

type Props = {
  projectId: string;
  containerStyle?: FlexProps;
};

export const ProjectListItem = memo(function ProjectListItem(props: Props) {
  const { projectId, containerStyle } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { projectIcon } = useProjectIcon(project.projectIconId);
  const { teammateIds } = useTeammateIdsByProjectId(projectId);

  return (
    <Container aria-label="project list item" {...containerStyle}>
      <Flex
        borderRadius="lg"
        p={2}
        w={12}
        h={12}
        bg={projectBaseColor.color.color}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Icon
          size="md"
          icon={projectIcon.icon.icon as IconType}
          color="white"
        />
      </Flex>
      <Flex ml={3} flex={1} alignItems="flex-start">
        <Flex alignItems="center">
          <Text fontSize="sm">{project.name}</Text>
          <FavoriteButton projectId={projectId} />
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <AvatarGroup size="xs" spaceX={1} fontSize="xs">
          {teammateIds.slice(0, 2).map((id) => (
            <TeammateAvatar teammateId={id} key={id} />
          ))}
          {teammateIds.length > 2 && (
            <TeammateAvatar
              teammateId=""
              fallback={`+${teammateIds.length - 2}`}
            />
          )}
        </AvatarGroup>
        <PopoverProjectMenu
          addFavorite
          editProjectDetails
          copyProjectLink
          share
          projectId={project.id}
        >
          <IconButton aria-label="menu button" variant="ghost" ml={2}>
            <Icon icon="menu" size="xs" />
          </IconButton>
        </PopoverProjectMenu>
      </Flex>
    </Container>
  );
});
