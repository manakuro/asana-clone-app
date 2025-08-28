import { Flex, type FlexProps } from '@/components/ui/atoms';
import { transitions } from '@/styles';
import { memo } from 'react';
import { useInboxListItemContext } from './Provider';

type Props = FlexProps;

export const Container = memo<Props>(function Container(props) {
  const { ref } = useInboxListItemContext();

  return (
    <Flex
      maxW="inherit"
      ref={ref}
      flex={1}
      px={6}
      pb={2}
      transition={transitions.base()}
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray.200"
      cursor="pointer"
      position="relative"
      _hover={{
        borderColor: 'gray.300',
      }}
      {...props}
    />
  );
});
