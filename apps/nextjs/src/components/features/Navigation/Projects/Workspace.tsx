import { usePathname } from 'next/navigation';
import { memo, useCallback, useMemo } from 'react';
import { useInviteModal } from '@/components/features/Modals/InviteModal/useInviteModal';
import { useNavigation } from '@/components/features/Navigation';
import { PADDING_X } from '@/components/features/Navigation/Navigation';
import { Flex } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { Menu } from '@/components/ui/Menu';
import { NextLink } from '@/components/ui/NextLink';
import { Portal } from '@/components/ui/Portal';
import { Text } from '@/components/ui/Text';
import { useClickableHoverStyle, useLinkHoverStyle } from '@/hooks';
import { ROUTE_WORKSPACES, ROUTE_WORKSPACES_OVERVIEW } from '@/router';
import { useWorkspace } from '@/store/entities/workspace';

export const Workspace = memo(function Workspace() {
  const pathname = usePathname();
  const { isExpanded } = useNavigation();
  const { _hover, selectedStyle } = useLinkHoverStyle();
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { workspace } = useWorkspace();
  const name = useMemo(() => {
    if (!isExpanded) return workspace.name.slice(0, 3);
    return workspace.name;
  }, [isExpanded, workspace.name]);

  const isCurrentRoute = useMemo(
    () =>
      pathname?.includes(ROUTE_WORKSPACES.href.pathname(workspace.id)) ?? false,
    [pathname, workspace.id],
  );

  const { setIsOpen } = useInviteModal();

  const handleInvitePeople = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }} lazyMount>
      <Flex
        p={2}
        px={PADDING_X}
        _hover={_hover}
        alignItems="center"
        {...(isCurrentRoute ? selectedStyle : {})}
      >
        <Flex flex={1}>
          {!!workspace.id && (
            <Link w="full" asChild>
              <NextLink
                href={ROUTE_WORKSPACES_OVERVIEW.href.pathnameObj(workspace.id)}
              >
                <Text fontSize="sm" flex={1}>
                  {name}
                </Text>
              </NextLink>
            </Link>
          )}
        </Flex>
        <Menu.Trigger asChild>
          <Icon icon="plus" {...clickableHoverLightStyle} />
        </Menu.Trigger>
      </Flex>
      <Portal>
        <Menu.Positioner>
          <Menu.Content color="text.base">
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Create project</Menu.ItemGroupLabel>
              <Menu.Item value="0" disabled>
                <Icon icon="layout" />
                Use a template
              </Menu.Item>
              <Menu.Item value="1" disabled>
                <Icon icon="spreadsheet" />
                Import spreadsheet
              </Menu.Item>
              <Menu.Item value="2" disabled>
                <Icon icon="fileBlank" />
                Blank project
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Separator />
            <Menu.Item value="3" onClick={handleInvitePeople}>
              <Icon icon="userPlus" />
              Invite people
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
});
