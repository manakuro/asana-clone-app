import { forwardRef, memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Provider } from './Provider';

type Props = FlexProps;
type ComponentProps = Omit<Props, 'taskColumnIds'>;

export const TasksList = memo(function TasksList(props: Props) {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
});

const Component = memo(
  forwardRef<HTMLDivElement, ComponentProps>((props, ref) => (
    <Flex flex={1} h="full" flexDirection="column" {...props} ref={ref} />
  )),
);
