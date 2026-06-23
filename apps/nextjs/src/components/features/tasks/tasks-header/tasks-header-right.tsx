import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';

type Props = FlexProps & {
  spacing?: number;
};

export const TasksHeaderRight = memo(function TasksHeaderRight(props: Props) {
  const { children, ...rest } = props;

  return (
    <Flex {...rest}>
      <Stack gap={props.spacing ?? 2} direction="row">
        {children}
      </Stack>
    </Flex>
  );
});
