import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { Stack } from '@/components/ui/stack';

type Props = FlexProps & {
  spacing?: number;
};

export const InboxHeaderRight = memo(function InboxHeaderRight(props: Props) {
  const { children, ...rest } = props;

  return (
    <Flex ml="auto" {...rest}>
      <Stack gap={props.spacing ?? 4} direction="row">
        {children}
      </Stack>
    </Flex>
  );
});
