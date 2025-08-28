import { Flex, type FlexProps, Stack } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps & {
  spacing?: number;
};

export const TasksHeaderRight = memo(function TasksHeaderRight(props: Props) {
  const { children, ...rest } = props;

  return (
    <Flex {...rest}>
      <Stack spacing={props.spacing ?? 2} direction="row">
        {children}
      </Stack>
    </Flex>
  );
});
