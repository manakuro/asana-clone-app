import { memo } from 'react';
import { Heading, type HeadingProps } from '@/components/ui/heading';

type Props = HeadingProps;

export const CustomNavListHeader = memo(function CustomNavListHeader(
  props: Props,
) {
  return (
    <Heading
      as="h4"
      size="xs"
      color="fg.muted"
      flex="1"
      textAlign="left"
      {...props}
    />
  );
});
