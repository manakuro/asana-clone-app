import { Button, Flex, Icon, IconButton } from '@/components/ui/atoms';
import type {
  RenderProps,
  UseToastOptions as UseToastOptionsChakra,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useCallback } from 'react';

export type ToastProps = UseToastOptionsChakra & {
  undo?: (() => void) | (() => Promise<void>);
  close?: () => void;
};
type Props = ToastProps & RenderProps;

export const Toast = forwardRef<HTMLDivElement, Props>(
  function Toast(props, ref) {
    const handleUndo = useCallback(() => {
      props.undo?.();
      props.close?.();
    }, [props]);

    return (
      <Flex
        ref={ref}
        p={4}
        borderRadius="md"
        borderTop="8px"
        borderColor="teal.400"
        borderStyle="solid"
        bg="white"
        fontSize="sm"
        w="256px"
        minH="100px"
        boxShadow="md"
        flexDirection="column"
        aria-label="toast-content"
      >
        <Flex alignItems="center">
          {props.description}
          {props.isClosable && (
            <IconButton
              icon={<Icon icon="x" color="text.muted" />}
              aria-label="close toast"
              variant="ghost"
              onClick={props.onClose}
              ml="auto"
            />
          )}
        </Flex>
        {props.undo && (
          <Flex justifyContent="flex-end" mt={2}>
            <Button
              variant="outline"
              onClick={handleUndo}
              fontSize="sm"
              size="sm"
            >
              Undo
            </Button>
          </Flex>
        )}
      </Flex>
    );
  },
);
(Toast as any).id = 'Toast';
