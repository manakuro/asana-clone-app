import { Flex } from '@/components/ui/atoms';
import { useClickOutside } from '@/hooks';
import type React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ClickOutsideWrapper(props: React.PropsWithChildren<Props>) {
  const { onClose, children, isOpen } = props;
  const { ref } = useClickOutside<HTMLDivElement>(onClose);

  if (!isOpen) return <>{children}</>;

  return (
    <Flex flex={1} ref={ref}>
      {children}
    </Flex>
  );
}
