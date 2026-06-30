import { forwardRef, memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Context } from './context';

type Props = FlexProps;

export const TasksCalendar = memo(function TasksCalendar(props: Props) {
  return (
    <Context>
      <Component {...props} />
    </Context>
  );
});

const Component = forwardRef<HTMLDivElement, Props>(
  function Component(props, ref) {
    return (
      <Flex
        flex={1}
        h="full"
        flexDirection="column"
        bg="gray.50"
        {...props}
        ref={ref}
      />
    );
  },
);
