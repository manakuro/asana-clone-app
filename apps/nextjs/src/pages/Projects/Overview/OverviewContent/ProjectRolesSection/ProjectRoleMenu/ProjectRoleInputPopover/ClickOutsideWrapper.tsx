import { Flex } from '@/components/ui/atoms';
import { useClickOutside } from '@/hooks';
import type React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ClickOutsideWrapper: React.FCWithChildren<Props> = (props) => {
  const { onClose, children, isOpen } = props;
  const { ref } = useClickOutside<HTMLDivElement>(onClose);

  if (!isOpen) return <>{children}</>;

  return (
    <Flex flex={1} ref={ref}>
      {children}
    </Flex>
  );
};
ClickOutsideWrapper.displayName = 'ClickOutsideWrapper';
