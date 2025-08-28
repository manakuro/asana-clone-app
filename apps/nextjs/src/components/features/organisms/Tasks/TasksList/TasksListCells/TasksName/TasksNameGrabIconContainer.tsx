import { Flex, type FlexProps } from '@/components/ui/atoms';
import type React from 'react';
import { memo, useMemo } from 'react';
import { useTasksNameContext } from './TasksNameProvider';

type Props = FlexProps;

export const TasksNameGrabIconContainer: React.FC<Props> = memo<Props>(
  (props) => {
    const { isHovering, inputFocused } = useTasksNameContext();
    const borderColor = useMemo(() => {
      if (inputFocused) return 'cyan.400';
      if (isHovering) return 'gray.400';
      return 'white';
    }, [inputFocused, isHovering]);

    return (
      <Flex
        position="absolute"
        left="0"
        w="24px"
        top="0"
        h="37px"
        borderTop="1px"
        borderBottom="1px"
        borderColor={borderColor}
        borderStyle="solid"
        justifyContent="center"
        alignItems="center"
        {...props}
      />
    );
  },
);
