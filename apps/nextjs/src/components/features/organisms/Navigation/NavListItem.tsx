import type React from 'react';
import { memo, useMemo } from 'react';
import {
  Icon,
  Link,
  type LinkProps,
  ListItem,
  type ListItemProps,
  NextLink,
  Text,
} from 'src/components/ui/atoms';
import { useLinkHoverStyle } from 'src/hooks';
import type { StaticRoutes } from 'src/router';
import { PADDING_X } from './Navigation';
import type { NavListItem as TNavListItem } from './type';

type Props = {
  item: TNavListItem;
  light?: boolean;
  linkStyle?: LinkProps;
  disabled?: boolean;
} & ListItemProps;

export const NavListItem: React.FC<Props> = memo<Props>((props) => {
  const { item, linkStyle, light, disabled, ...rest } = props;
  const { _hover, selectedStyle } = useLinkHoverStyle();
  const listItemStyle = useMemo(
    (): ListItemProps => ({
      ...(disabled
        ? { opacity: 0.6, pointerEvents: 'none', cursor: 'not-allowed' }
        : {}),
    }),
    [disabled],
  );

  return (
    <ListItem {...listItemStyle} {...rest}>
      <WithNextLink {...props}>
        <Link
          href={item.href}
          isExternal={item.isExternal ?? false}
          display="flex"
          alignItems="center"
          px={PADDING_X}
          py={2}
          _hover={_hover}
          {...(item.isCurrentRoute?.() ? selectedStyle : {})}
          {...linkStyle}
        >
          <Icon icon={item.icon} mr={PADDING_X} mt="-2px" />
          <Text fontSize="sm">{item.name}</Text>
        </Link>
      </WithNextLink>
    </ListItem>
  );
});
NavListItem.displayName = 'NavListItem';

const WithNextLink: React.FC<Props> = (props) => {
  return props.item.isExternal ? (
    <>{props.children}</>
  ) : (
    <NextLink href={props.item.href as StaticRoutes} passHref legacyBehavior>
      {props.children}
    </NextLink>
  );
};
