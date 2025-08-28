import { Heading, type HeadingProps } from '@/components/ui/atoms';

type Props = HeadingProps;

export function BodyHeader(props: Props) {
  return <Heading as="h5" size="sm" {...props} />;
}
