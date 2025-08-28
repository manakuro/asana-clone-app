import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { useDescriptionContext } from './Provider';

type Props = FlexProps;

export const Container = memo(function Container(props: Props) {
  const { ref, focused, onFocus } = useDescriptionContext();

  return (
    <Flex
      ref={ref}
      border="1px"
      borderRadius="md"
      borderColor={focused ? 'gray.400' : 'transparent'}
      _hover={{
        borderColor: 'gray.400',
      }}
      py={2}
      px={3}
      flexDirection="column"
      flex={1}
      position="relative"
      onFocus={onFocus}
      {...props}
    />
  );
});
