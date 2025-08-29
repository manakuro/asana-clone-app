import { Heading, type HeadingProps } from '@/components/ui/atoms';

type Props = HeadingProps;

export function OverviewContentHeading(props: Props) {
  return <Heading as="h2" size="md" {...props} />;
}
