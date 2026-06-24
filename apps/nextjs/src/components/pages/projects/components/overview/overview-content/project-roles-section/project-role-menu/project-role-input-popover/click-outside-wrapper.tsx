import type React from 'react';
import { Flex } from '@/components/ui/flex';
import { useClickOutside } from '@/hooks';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ClickOutsideWrapper(props: React.PropsWithChildren<Props>) {
  const { onClose, children, open } = props;
  const { ref } = useClickOutside<HTMLDivElement>(onClose);

  if (!open) return <>{children}</>;

  return (
    <Flex flex={1} ref={ref}>
      {children}
    </Flex>
  );
}
