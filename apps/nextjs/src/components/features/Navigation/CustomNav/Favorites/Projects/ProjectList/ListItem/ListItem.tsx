import { PADDING_X, useNavigation } from '@/components/features/Navigation';
import { ColorBox } from '@/components/ui/ColorBox';
import { Flex } from '@/components/ui/Flex';
import { Link } from '@/components/ui/Link';
import { NextLink } from '@/components/ui/NextLink';
import { Text } from '@/components/ui/Text';
import { useLinkHoverStyle } from '@/hooks';
import { ROUTE_PROJECTS_LIST } from '@/router';
import { ROUTE_PROJECTS } from '@/router/projects';
import { useProject } from '@/store/entities/project';
import { useProjectBaseColor } from '@/store/entities/projectBaseColor';
import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import { ProjectMenu } from './ProjectMenu';

type Props = {
  projectId: string;
};

export const ListItem = memo(function ListItem(props: Props) {
  const { isExpanded } = useNavigation();
  const { projectId } = props;
  const { project } = useProject(projectId);
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId);
  const { _hover, selectedStyle } = useLinkHoverStyle();
  const pathname = usePathname();
  const selected = useMemo(
    () => pathname?.includes(ROUTE_PROJECTS.href.pathname(projectId)),
    [projectId, pathname],
  );

  return (
    <NextLink
      href={ROUTE_PROJECTS_LIST.href.pathnameObj(projectId)}
      passHref
      legacyBehavior
    >
      <Link
        w="full"
        p={2}
        px={PADDING_X}
        _hover={_hover}
        {...(selected ? selectedStyle : {})}
      >
        <Flex alignItems="center">
          {isExpanded ? (
            <Flex alignItems="center" flex={1}>
              <ColorBox size="xs" ml={1} color={projectBaseColor.color.color} />
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
          <ProjectMenu projectId={projectId} />
        </Flex>
      </Link>
    </NextLink>
  );
});
