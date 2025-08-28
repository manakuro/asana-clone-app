import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useClickableHoverStyle } from '@/hooks';

type Props = FlexProps;

export function Container(props: Props) {
  const { clickableHoverStyle } = useClickableHoverStyle();

  return (
    <Flex
      w="full"
      borderBottom="1px"
      borderColor="gray.200"
      py={3}
      px={2}
      {...clickableHoverStyle}
      {...props}
    />
  );
}
