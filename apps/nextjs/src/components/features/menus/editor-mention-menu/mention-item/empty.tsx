import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useMenuStyle } from '@/hooks/styles/use-menu-style';

type Props = FlexProps;

export const Empty = memo(function Empty(props: Props) {
  const styles = useMenuStyle().item;

  return (
    <Flex
      fontSize="sm"
      css={styles}
      color="fg.muted"
      pointerEvents="none"
      {...props}
    >
      {props.children}
    </Flex>
  );
});
