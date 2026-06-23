import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps;

export const Actions = memo(function Actions(props: Props) {
  return (
    <Flex
      borderRadius="md"
      border="1px"
      borderStyle="solid"
      borderColor="border"
      boxShadow="sm"
      position="absolute"
      p={1}
      top={2}
      right={4}
      {...props}
    />
  );
});
