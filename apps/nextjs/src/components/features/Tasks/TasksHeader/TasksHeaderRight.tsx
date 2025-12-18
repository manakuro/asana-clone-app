import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/Flex';
import { Stack } from '@/components/ui/Stack';

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
