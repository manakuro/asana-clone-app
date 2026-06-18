import type { ListItemProps } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { Icon } from '@/components/ui/icon';
import { Link, type LinkProps } from '@/components/ui/link';
import { List } from '@/components/ui/list';
import { NextLink } from '@/components/ui/next-link';
import { Text } from '@/components/ui/text';
import { useLinkHoverStyle } from '@/hooks';
import type { StaticRoutes } from '@/router';
import { PADDING_X } from './Navigation';
import type { NavListItem as TNavListItem } from './type';

type Props = {
  item: TNavListItem;
  light?: boolean;
  linkProps?: LinkProps;
  disabled?: boolean;
};

export const NavListItem = memo(function NavListItem(props: Props) {
  const { item, disabled } = props;
  const listItemStyle = useMemo(
    (): ListItemProps => ({
      ...(disabled
        ? { opacity: 0.6, pointerEvents: 'none', cursor: 'not-allowed' }
        : {}),
    }),
    [disabled],
  );

  return (
    <List.Item display="flex" flexDirection="column" {...listItemStyle}>
      {props.item.isExternal ? (
        <NavListLink
          item={props.item}
          linkProps={props.linkProps}
          target="_blank"
        >
          <Icon icon={item.icon} mr={PADDING_X} mt="-2px" />
          <Text fontSize="sm" color="fg">
            {item.name}
          </Text>
        </NavListLink>
      ) : (
        <NavListLink item={props.item} linkProps={props.linkProps} asChild>
          <NextLink href={props.item.href as StaticRoutes}>
            <Icon icon={item.icon} mr={PADDING_X} mt="-2px" />
            <Text fontSize="sm" color="fg">
              {item.name}
            </Text>
          </NextLink>
        </NavListLink>
      )}
    </List.Item>
  );
});

function NavListLink(
  props: LinkProps & { item: TNavListItem; linkProps?: LinkProps },
) {
  const { item, linkProps, ...rest } = props;
  const { _hover, selectedStyle } = useLinkHoverStyle();
  return (
    <Link
      display="flex"
      flex={1}
      alignItems="center"
      px={PADDING_X}
      py={2}
      _hover={_hover}
      {...(item.isCurrentRoute?.() ? selectedStyle : {})}
      {...linkProps}
      {...rest}
    />
  );
}
