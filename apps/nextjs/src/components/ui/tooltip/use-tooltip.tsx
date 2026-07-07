import { useEffect } from 'react';
import { useHover } from '@/hooks/use-hover';
import { useMountedRef } from '@/hooks/use-mounted-ref';
import { useDisclosure } from '@/lib/chakra-ui';

type Props = {
  openDelay?: number;
};

export const useTooltip = <T extends HTMLElement>(props: Props = {}) => {
  const { open, onOpen, onClose } = useDisclosure();
  const { ref, isHovering } = useHover<T>();
  const { mountedRef } = useMountedRef();

  useEffect(() => {
    if (isHovering) {
      if (props.openDelay) {
        setTimeout(() => {
          if (mountedRef.current) {
            onOpen();
          }
        }, props.openDelay);
        return;
      }
      onOpen();
    } else {
      onClose();
    }
  }, [isHovering, mountedRef, onClose, onOpen, props.openDelay]);

  return {
    ref,
    open,
    onClose,
    onOpen,
  };
};
