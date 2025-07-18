import { useRouter } from 'next/router';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useInviteModal } from 'src/components/features/organisms/Modals/InviteModal/useInviteModal';
import { useNavigation } from 'src/components/features/organisms/Navigation';
import { PADDING_X } from 'src/components/features/organisms/Navigation/Navigation';
import {
  Flex,
  Icon,
  Link,
  NextLink,
  Portal,
  Text,
} from 'src/components/ui/atoms';
import {
  MenuItem as AtomsMenuItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  type MenuItemProps,
  MenuList,
} from 'src/components/ui/organisms/Menu';
import { useClickableHoverStyle, useLinkHoverStyle } from 'src/hooks';
import { ROUTE_WORKSPACES, ROUTE_WORKSPACES_OVERVIEW } from 'src/router';
import { useWorkspace } from 'src/store/entities/workspace';

export const Workspace = memo(function Workspace() {
  const router = useRouter();
  const { isExpanded } = useNavigation();
  const { _hover, selectedStyle } = useLinkHoverStyle();
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { workspace } = useWorkspace();
  const name = useMemo(() => {
    if (!isExpanded) return workspace.name.slice(0, 3);
    return workspace.name;
  }, [isExpanded, workspace.name]);

  const isCurrentRoute = useMemo(
    () => router.asPath.includes(ROUTE_WORKSPACES.href.pathname(workspace.id)),
    [router.asPath, workspace.id],
  );

  const { setIsOpen } = useInviteModal();

  const handleInvitePeople = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <>
      <Menu placement="bottom-end">
        <Flex
          p={2}
          px={PADDING_X}
          _hover={_hover}
          alignItems="center"
          {...(isCurrentRoute ? selectedStyle : {})}
        >
          <Flex flex={1}>
            {!!workspace.id && (
              <NextLink
                href={ROUTE_WORKSPACES_OVERVIEW.href.pathnameObj(workspace.id)}
                passHref
                legacyBehavior
              >
                <Link w="full">
                  <Text fontSize="sm" flex={1}>
                    {name}
                  </Text>
                </Link>
              </NextLink>
            )}
          </Flex>
          <MenuButton {...clickableHoverLightStyle}>
            <Icon icon="plus" />
          </MenuButton>
        </Flex>
        <Portal>
          <MenuList color="text.base">
            <MenuGroup title="Create project">
              <MenuItem icon={<Icon icon="layout" />} isDisabled>
                Use a template
              </MenuItem>
              <MenuItem icon={<Icon icon="spreadsheet" />} isDisabled>
                Import spreadsheet
              </MenuItem>
              <MenuItem icon={<Icon icon="fileBlank" />} isDisabled>
                Blank project
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem
              icon={<Icon icon="userPlus" />}
              onClick={handleInvitePeople}
            >
              Invite people
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  );
});

const MenuItem: React.FC<MenuItemProps> = (props) => (
  <AtomsMenuItem fontSize="sm" iconSpacing={2} {...props} />
);
