import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps;

export const Actions = memo(function Actions(props: Props) {
  return (
    <Flex
      borderRadius="md"
      border="1px"
      borderStyle="solid"
      borderColor="gray.200"
      boxShadow="sm"
      position="absolute"
      p={1}
      top={2}
      right={4}
      {...props}
    />
  );
});
