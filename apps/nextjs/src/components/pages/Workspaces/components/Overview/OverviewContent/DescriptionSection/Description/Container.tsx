import { Flex, type FlexProps } from '@/components/ui/Flex';
import type React from 'react';
import { memo } from 'react';
import { useDescriptionContext } from './Provider';

type Props = FlexProps;

export const Container: React.FC<Props> = memo<Props>((props) => {
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
Container.displayName = 'Container';
