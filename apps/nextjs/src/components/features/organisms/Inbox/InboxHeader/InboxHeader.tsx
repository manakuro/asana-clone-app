import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMainStyle } from '@/hooks';
import { memo } from 'react';

type Props = FlexProps;

export const InboxHeader = memo(function InboxHeader(props: Props) {
  const { paddingX } = useMainStyle();

  return (
    <Flex
      flex={1}
      maxH="57px"
      px={paddingX}
      py={4}
      bg="white"
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray.200"
      {...props}
    />
  );
});
