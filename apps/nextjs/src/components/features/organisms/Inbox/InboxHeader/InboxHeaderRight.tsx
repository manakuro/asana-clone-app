import { Flex, type FlexProps, Stack } from '@/components/ui/atoms';
import { memo } from 'react';

type Props = FlexProps & {
  spacing?: number;
};

export const InboxHeaderRight = memo(function InboxHeaderRight(props: Props) {
  const { children, ...rest } = props;

  return (
    <Flex ml="auto" {...rest}>
      <Stack spacing={props.spacing ?? 4} direction="row">
        {children}
      </Stack>
    </Flex>
  );
});
