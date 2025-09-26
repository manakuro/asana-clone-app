import type { ToastProps } from '@/components/ui/Toast';
import type { ToastId } from '@chakra-ui/react';
import { createStandaloneToast } from '@chakra-ui/react';

type Props = ToastProps;

let toastIdRef: ToastId | undefined;

export const useStandaloneToast = () => {
  const toastChakraUi = createStandaloneToast();

  const toast = (props: Props) => {
    const isClosable = props.isClosable ?? true;
    const position = props.position ?? 'bottom-left';
    const duration = props.duration ?? 5000;

    const toastProps = {
      ...props,
      isClosable,
      position,
      duration,
    };

    toastIdRef = toastChakraUi.toast({
      ...toastProps,
    });

    return toastIdRef;
  };

  return {
    toast,
  };
};
