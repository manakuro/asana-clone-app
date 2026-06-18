import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useDescriptionContext } from './Provider';

type Props = FlexProps;

export const Container = memo<Props>(function Container(props) {
  const { ref, focused, onFocus } = useDescriptionContext();

  return (
    <Flex
      ref={ref}
      position="relative"
      flexDirection="column"
      flex={1}
      mt={2}
      py={1}
      px={1}
      mr={-1}
      ml={-1}
      border="1px"
      borderRadius="md"
      borderColor={focused ? 'gray.400' : 'transparent'}
      _hover={{
        borderColor: 'gray.400',
      }}
      onFocus={onFocus}
      {...props}
    />
  );
});
