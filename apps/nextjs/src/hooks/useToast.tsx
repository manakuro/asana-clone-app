import { Toast, type ToastProps } from '@/components/ui/Toast';
import { type ToastId, useToast as useToastChakraUi } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';

type Props = ToastProps;

export const useToast = () => {
  const toastChakraUi = useToastChakraUi();
  const toastIdRef = useRef<ToastId | undefined>();

  const close = useCallback(() => {
    if (!toastIdRef.current) return;
    toastChakraUi.close(toastIdRef.current);
  }, [toastChakraUi]);

  const toast = useCallback(
    (props: Props) => {
      const isClosable = props.isClosable ?? true;
      const position = props.position ?? 'bottom-left';
      const duration = props.duration ?? 5000;

      const toastProps = {
        ...props,
        isClosable,
        position,
        duration,
      };

      toastIdRef.current = toastChakraUi({
        ...toastProps,
        render: (renderProps) => {
          return <Toast {...toastProps} {...renderProps} close={close} />;
        },
      });

      return toastIdRef.current;
    },
    [close, toastChakraUi],
  );

  return {
    toast,
  };
};
