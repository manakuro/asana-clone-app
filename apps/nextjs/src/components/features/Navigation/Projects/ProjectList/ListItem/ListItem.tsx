import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import { useNavigation } from '@/components/features/Navigation';
import { PADDING_X } from '@/components/features/Navigation/Navigation';
import { PopoverProjectMenu } from '@/components/features/Popovers';
import { Box } from '@/components/ui/box';
import { ColorBox } from '@/components/ui/color-box';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Link } from '@/components/ui/link';
import { NextLink } from '@/components/ui/next-link';
import { Text } from '@/components/ui/text';
import { useClickableHoverStyle, useLinkHoverStyle } from '@/hooks';
import { ROUTE_PROJECTS_LIST } from '@/router';
import { ROUTE_PROJECTS } from '@/router/projects';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';

type Props = {
  projectId: string;
};

export const ListItem = memo(function ListItem(props: Props) {
  const { isExpanded } = useNavigation();
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { _hover, selectedStyle } = useLinkHoverStyle();
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const pathname = usePathname();
  const selected = useMemo(
    () => pathname?.includes(ROUTE_PROJECTS.href.pathname(projectId)) ?? false,
    [projectId, pathname],
  );

  return (
    <Link
      w="full"
      p={2}
      px={PADDING_X}
      _hover={_hover}
      {...(selected ? selectedStyle : {})}
      asChild
    >
      <NextLink href={ROUTE_PROJECTS_LIST.href.pathnameObj(projectId)}>
        <Flex alignItems="center" flex={1}>
          {isExpanded ? (
            <Flex alignItems="center" flex={1}>
              <ColorBox size="xs" color={projectBaseColor.color.color} />
              <Text fontSize="sm" flex={1} ml={2}>
                {project.name}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center" justifyContent="center" flex={1}>
              <Text fontSize="sm" flex={1}>
                {project.name.slice(0, 3)}
              </Text>
            </Flex>
          )}
          <Box
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <PopoverProjectMenu
              addFavorite
              duplicateProject
              archiveProject
              deleteProject
              projectId={props.projectId}
            >
              <IconButton unstyled>
                <Icon
                  icon="dotsHorizontalRounded"
                  {...clickableHoverLightStyle}
                />
              </IconButton>
            </PopoverProjectMenu>
          </Box>
        </Flex>
      </NextLink>
    </Link>
  );
});
