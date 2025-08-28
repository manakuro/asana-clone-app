import { Flex, type FlexProps } from '@/components/ui/atoms';
import { forwardRef } from 'react';
import { memo } from 'react';
import { Provider } from './Provider';

type Props = FlexProps;
type ComponentProps = Omit<Props, 'taskColumnIds'>;

export const TasksFiles = memo(function TasksFiles(props: Props) {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
});

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  function Component(props, ref) {
    return (
      <Flex flex={1} h="full" flexDirection="column" {...props} ref={ref} />
    );
  },
);
