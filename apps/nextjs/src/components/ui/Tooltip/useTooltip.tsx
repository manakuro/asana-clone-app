import { useMountedRef } from '@/hooks';
import { useHover } from '@/hooks/useHover';
import { useDisclosure } from '@/shared/chakra';
import { useEffect } from 'react';

type Props = {
  openDelay?: number;
};

export const useTooltip = (props: Props = {}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref, isHovering } = useHover();
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
    isOpen,
    onClose,
    onOpen,
  };
};
