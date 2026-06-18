import { memo, useMemo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';

type Props = FlexProps & {
  isTransitioning: boolean;
};

export const TaskDoneTransition = memo(function TaskDoneTransition(
  props: Props,
) {
  const bgGradient = useMemo<FlexProps>(() => {
    if (props.isTransitioning)
      return {
        visibility: 'visible',
        opacity: 1,
        transition: 'opacity .25s;',
        _after: {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          transform: 'translateX(-100%)',
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))',
          animation: 'shimmer',
        },
      };
    return {};
  }, [props.isTransitioning]);

  return (
    <Flex
      position="absolute"
      left={0}
      top={0}
      w="full"
      h="calc(100% - 2px)"
      mt="1px"
      mb="1px"
      bg="inherit"
      visibility="hidden"
      opacity={0}
      backgroundImage="linear-gradient(to right, {colors.teal.50}, {colors.teal.100}, {colors.teal.200}, {colors.teal.200}, {colors.teal.100}, {colors.teal.50})"
      transition="visibility 0s .25s, opacity .25s linear"
      pointerEvents="none"
      overflow="hidden"
      {...bgGradient}
    />
  );
});
