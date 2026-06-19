import { Stack, type StackProps } from '@/components/ui/stack';

type Props = StackProps;

export function BodyStack(props: Props) {
  return <Stack gap={6} {...props} />;
}
