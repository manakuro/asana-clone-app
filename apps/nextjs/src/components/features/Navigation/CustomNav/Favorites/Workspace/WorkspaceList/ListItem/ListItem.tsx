import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import { PADDING_X, useNavigation } from '@/components/features/Navigation';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { NextLink } from '@/components/ui/next-link';
import { Text } from '@/components/ui/text';
import { useLinkHoverStyle } from '@/hooks';
import { ROUTE_WORKSPACES, ROUTE_WORKSPACES_OVERVIEW } from '@/router';
import { useWorkspace } from '@/store/entities/workspace';
import { WorkspaceMenu } from './WorkspaceMenu';

export const ListItem = memo(function ListItem() {
  const { isExpanded } = useNavigation();
  const { workspace } = useWorkspace();
  const { _hover, selectedStyle } = useLinkHoverStyle();
  const pathname = usePathname();
  const selected = useMemo(
    () => pathname?.includes(ROUTE_WORKSPACES.href.pathname(workspace.id)),
    [workspace.id, pathname],
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
      <NextLink href={ROUTE_WORKSPACES_OVERVIEW.href.pathnameObj(workspace.id)}>
        <Flex alignItems="center" flex={1}>
          {isExpanded ? (
            <Flex alignItems="center" flex={1}>
              <Icon icon="group" size="sm" color="fg.muted" />
              <Text fontSize="sm" flex={1} ml={2}>
                {workspace.name}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center" justifyContent="center" flex={1}>
              <Text fontSize="sm" flex={1}>
                {workspace.name.slice(0, 3)}
              </Text>
            </Flex>
          )}
          <WorkspaceMenu workspaceId={workspace.id} />
        </Flex>
      </NextLink>
    </Link>
  );
});
