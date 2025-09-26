import {
  Skeleton as ChakraSkeleton,
  type SkeletonProps as ChakraSkeletonProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import type React from 'react';

type Props = ChakraSkeletonProps & {
  ref?: React.ForwardedRef<any>;
};
export type SkeletonProps = Props;

export const Skeleton = forwardRef<HTMLDivElement, Props>(
  function Skeleton(props, ref) {
    return (
      <ChakraSkeleton
        startColor="gray.100"
        endColor="gray.300"
        {...props}
        ref={ref}
      />
    );
  },
);
