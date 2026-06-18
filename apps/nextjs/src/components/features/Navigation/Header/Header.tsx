import { memo } from 'react';
import { PADDING_X, useNavigation } from '@/components/features/Navigation';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import { Logo } from '@/components/ui/Logo';
import { NextLink } from '@/components/ui/NextLink';
import { ROUTE_HOME } from '@/router';

export const Header = memo(function Header() {
  const { isExpanded, toggleMenu } = useNavigation();

  return (
    <Flex
      w="full"
      h="72px"
      minH="72px"
      alignItems="center"
      px={PADDING_X}
      justifyContent="flex-end"
      ml={isExpanded ? 0 : '-3px'}
    >
      {isExpanded && (
        <Link mr="auto" asChild>
          <NextLink href={ROUTE_HOME.href.pathname()}>
            <Logo />
          </NextLink>
        </Link>
      )}
      <IconButton
        mr={-2}
        onClick={toggleMenu}
        aria-label="expand button"
        variant="ghost"
        light
      >
        <Icon icon="menu" />
      </IconButton>
    </Flex>
  );
});
