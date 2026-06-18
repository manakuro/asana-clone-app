import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { useDescriptionContext } from './Provider';

type Props = FlexProps;

export const Container = memo<Props>(function Container(props) {
  const { ref, onFocus } = useDescriptionContext();

  return (
    <Flex
      ref={ref}
      position="relative"
      flexDirection="column"
      pb={6}
      flex={1}
      onFocus={onFocus}
      {...props}
    />
  );
});
