import { Flex, type FlexProps } from '@/components/ui/atoms';
import { useMenuStyle } from '@/hooks';
import { memo } from 'react';

type Props = FlexProps;

export const Empty = memo(function Empty(props: Props) {
  const styles = useMenuStyle().item;

  return (
    <Flex
      fontSize="sm"
      {...styles}
      color="text.muted"
      pointerEvents="none"
      {...props}
    >
      {props.children}
    </Flex>
  );
});
