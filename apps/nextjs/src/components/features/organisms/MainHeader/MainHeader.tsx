import { Flex, type FlexProps, Stack } from '@/components/ui/atoms';
import { useMainStyle } from '@/hooks';
import type { ChakraProps } from '@/shared/chakra';
import { type PropsWithChildren, memo, useMemo } from 'react';
import { AddButton } from './AddButton';
import { MyAccountAvatar } from './MyAccountAvatar';
import { SearchInput } from './SearchInput';

type Props = PropsWithChildren<{
  sticky?: boolean;
  isScrolling?: boolean;
}>;
export const MainHeader = memo(function MainHeader(props: Props) {
  const { sticky, isScrolling } = props;
  const { paddingX } = useMainStyle();
  const stickyStyle = useMemo((): FlexProps => {
    if (!sticky) return {};
    return {
      position: 'sticky',
      top: 0,
      left: 0,
      bg: 'white',
      zIndex: 'sticky',
    };
  }, [sticky]);
  const scrollingStyle = useMemo((): ChakraProps => {
    if (isScrolling) return { shadow: 'sm' };
    return {};
  }, [isScrolling]);

  return (
    <Flex {...stickyStyle} {...scrollingStyle}>
      <Flex
        w="full"
        h="72px"
        px={paddingX}
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Flex flex="1 1 auto" flexDirection="column" justifyContent="center">
          {props.children}
        </Flex>
        <Flex flex="0 0 auto" w="330px">
          <Stack
            w="full"
            spacing={4}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <SearchInput />
            <AddButton />
            <MyAccountAvatar />
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
});
