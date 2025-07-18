import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { forwardRef } from 'src/shared/chakra';
import { Provider } from './Provider';

type Props = FlexProps;

export const TasksCalendar: React.FC<Props> = memo((props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
});

const Component: React.FC<Props> = forwardRef((props, ref) => (
  <Flex
    flex={1}
    h="full"
    flexDirection="column"
    bg="gray.50"
    {...props}
    ref={ref}
  />
));

TasksCalendar.displayName = 'TasksCalendar';
