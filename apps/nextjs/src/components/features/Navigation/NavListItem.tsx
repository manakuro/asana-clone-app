import { memo, useMemo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Icon } from '@/components/ui/Icon';
import { Link, type LinkProps } from '@/components/ui/Link';
import { NextLink } from '@/components/ui/NextLink';
import { Text } from '@/components/ui/Text';
import { useLinkHoverStyle } from '@/hooks';
import type { StaticRoutes } from '@/router';
import { PADDING_X } from './Navigation';
import type { NavListItem as TNavListItem } from './type';

type Props = {
  item: TNavListItem;
  light?: boolean;
  linkStyle?: LinkProps;
  disabled?: boolean;
} & FlexProps;

export const NavListItem = memo(function NavListItem(props: Props) {
  const { item, linkStyle, light: _, disabled, ...rest } = props;
  const { _hover, selectedStyle } = useLinkHoverStyle();
  const listItemStyle = useMemo(
    (): FlexProps => ({
      ...(disabled
        ? { opacity: 0.6, pointerEvents: 'none', cursor: 'not-allowed' }
        : {}),
    }),
    [disabled],
  );

  return (
    <Flex flexDirection="column" {...listItemStyle} {...rest}>
      <Link
        href={item.href}
        target={item.isExternal ? '_blank' : undefined}
        display="flex"
        alignItems="center"
        px={PADDING_X}
        py={2}
        _hover={_hover}
        {...(item.isCurrentRoute?.() ? selectedStyle : {})}
        {...linkStyle}
        asChild={!item.isExternal}
      >
        <WithNextLink {...props}>
          <Icon icon={item.icon} mr={PADDING_X} mt="-2px" />
          <Text fontSize="sm">{item.name}</Text>
        </WithNextLink>
      </Link>
    </Flex>
  );
});

function WithNextLink(props: Props) {
  return props.item.isExternal ? (
    props.children
  ) : (
    <NextLink href={props.item.href as StaticRoutes}>{props.children}</NextLink>
  );
}
