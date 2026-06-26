import { forwardRef, memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Context } from './provider';

type Props = FlexProps;
type ComponentProps = Omit<Props, 'taskColumnIds'>;

export const TasksFiles = memo(function TasksFiles(props: Props) {
  return (
    <Context>
      <Component {...props} />
    </Context>
  );
});

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  function Component(props, ref) {
    return (
      <Flex flex={1} h="full" flexDirection="column" {...props} ref={ref} />
    );
  },
);
