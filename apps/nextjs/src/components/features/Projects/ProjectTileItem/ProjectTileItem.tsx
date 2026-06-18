import { memo } from 'react';
import { PopoverProjectMenu } from '@/components/features/Popovers';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { AvatarGroup } from '@/components/ui/avatar';
import { Fade } from '@/components/ui/fade';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import type { IconType } from '@/shared/icons';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import { useProjectIcon } from '@/store/entities/projectIcon';
import { useTeammateIdsByProjectId } from '@/store/entities/projectTeammate';
import { transitions } from '@/styles/transitions';
import { Container } from './Container';
import { FavoriteButton } from './FavoriteButton';

type Props = {
  projectId: string;
  containerStyle?: FlexProps;
};

export const ProjectTileItem = memo(function ProjectTileItem(props: Props) {
  const { projectId, containerStyle } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { projectIcon } = useProjectIcon(project.projectIconId);
  const { teammateIds } = useTeammateIdsByProjectId(projectId);

  return (
    <Container
      name={project.name}
      aria-label="project tile item"
      {...containerStyle}
    >
      {({
        showTransition,
        handlePopoverProjectMenuClosed,
        handlePopoverProjectMenuOpened,
      }) => (
        <Flex
          borderRadius="3xl"
          p={2}
          w="120px"
          h="120px"
          bg={projectBaseColor.color.color}
          color="white"
          position="relative"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Flex position="absolute" top="10px" left={2}>
            <Fade in={showTransition}>
              <FavoriteButton projectId={projectId} />
            </Fade>
          </Flex>

          <Flex position="absolute" top={2} right={2}>
            <Fade in={showTransition}>
              <PopoverProjectMenu
                addFavorite
                editProjectDetails
                copyProjectLink
                share
                projectId={project.id}
                onOpened={handlePopoverProjectMenuOpened}
                onClosed={handlePopoverProjectMenuClosed}
              >
                <IconButton
                  aria-label="menu button"
                  variant="ghost"
                  light
                  _open={{ bg: 'navigation.selected' }}
                >
                  <Icon icon="menu" size="xs" color="white" />
                </IconButton>
              </PopoverProjectMenu>
            </Fade>
          </Flex>

          <Flex
            {...(showTransition
              ? {
                  transform: 'translate(0, -3px)',
                }
              : {})}
            transition={transitions.base()}
            position="relative"
          >
            <Icon
              size="3xl"
              color="white"
              icon={projectIcon.icon.icon as IconType}
            />
          </Flex>

          {showTransition && (
            <Flex position="absolute" bottom={3}>
              <Fade in>
                <AvatarGroup size="xs">
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
              </Fade>
            </Flex>
          )}
        </Flex>
      )}
    </Container>
  );
});
