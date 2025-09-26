import { Flex, type FlexProps } from '@/components/ui/Flex';
import { memo } from 'react';
import { useDescriptionContext } from './Provider';

type Props = FlexProps;

export const Container = memo(function Container(props: Props) {
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
