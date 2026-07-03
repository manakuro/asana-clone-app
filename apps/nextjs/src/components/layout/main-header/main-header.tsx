import { memo, type PropsWithChildren, useMemo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';
import { useMainStyle } from '@/hooks/styles/use-main-style';
import { AddButton } from './add-button';
import { MyAccountAvatar } from './my-account-avatar';
import { SearchInput } from './search-input';

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
  const scrollingStyle = useMemo(() => {
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
        borderColor="border"
        borderStyle="solid"
      >
        <Flex flex="1 1 auto" flexDirection="column" justifyContent="center">
          {props.children}
        </Flex>
        <Flex flex="0 0 auto" w="330px">
          <Stack
            w="full"
            gap={4}
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
