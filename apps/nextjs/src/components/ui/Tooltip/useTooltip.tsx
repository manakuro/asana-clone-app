import { useEffect } from 'react';
import { useMountedRef } from '@/hooks';
import { useHover } from '@/hooks/useHover';
import { useDisclosure } from '@/shared/chakra';

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
