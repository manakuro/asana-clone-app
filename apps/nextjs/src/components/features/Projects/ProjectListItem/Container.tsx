import { Flex, type FlexProps } from '@/components/ui/flex';
import { useClickableHoverStyle } from '@/hooks';

type Props = FlexProps;

export function Container(props: Props) {
  const { clickableHoverStyle } = useClickableHoverStyle();

  return (
    <Flex
      w="full"
      borderBottom="1px"
      borderColor="border"
      borderStyle="solid"
      py={3}
      px={2}
      css={clickableHoverStyle}
      {...props}
    />
  );
}
