import { Heading, type HeadingProps } from '@/components/ui/Heading';

type Props = HeadingProps;

export function BodyHeader(props: Props) {
  return <Heading as="h5" size="sm" {...props} />;
}
