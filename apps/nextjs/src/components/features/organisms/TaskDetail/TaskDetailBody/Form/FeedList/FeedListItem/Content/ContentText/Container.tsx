import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { useTaskFeedListItemContext } from '../../Provider';

type Props = FlexProps;

export const Container = memo(function Container(props: Props) {
  const { editable } = useTaskFeedListItemContext();

  return (
    <Flex
      border="1px"
      borderRadius="md"
      borderColor={editable() ? 'gray.400' : 'transparent'}
      p={2}
      flexDirection="column"
      flex={1}
      bg={editable() ? 'white' : 'transparent'}
      minH={editable() ? 40 : 0}
      position="relative"
      {...props}
    />
  );
});
