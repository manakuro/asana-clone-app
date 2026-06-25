import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useMainStyle } from '@/hooks/styles/use-main-style';

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
      borderColor="border"
      {...props}
    />
  );
});
