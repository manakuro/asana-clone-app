import { forwardRef, memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Context } from './context';

type Props = FlexProps;
type ComponentProps = Omit<Props, 'taskColumnIds'>;

export const TasksList = memo(function TasksList(props: Props) {
  return (
    <Context>
      <Component {...props} />
    </Context>
  );
});

const Component = memo(
  forwardRef<HTMLDivElement, ComponentProps>((props, ref) => (
    <Flex flex={1} h="full" flexDirection="column" {...props} ref={ref} />
  )),
);
