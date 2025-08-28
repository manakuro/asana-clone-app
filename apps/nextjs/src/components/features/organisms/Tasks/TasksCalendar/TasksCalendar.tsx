import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from 'react';
import { memo } from 'react';
import { Provider } from './Provider';

type Props = FlexProps;

export const TasksCalendar = memo(function TasksCalendar(props: Props) {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
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
