import { memo } from 'react';
import { Heading, type HeadingProps } from '@/components/ui/Heading';

type Props = HeadingProps;

export const CustomNavListHeader = memo(function CustomNavListHeader(
  props: Props,
) {
  return (
    <Heading
      as="h4"
      size="xs"
      color="text.muted"
      flex="1"
      textAlign="left"
      {...props}
    />
  );
});
