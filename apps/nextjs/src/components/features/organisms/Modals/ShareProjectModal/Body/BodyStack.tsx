import { Stack, type StackProps } from '@/components/ui/atoms';

type Props = StackProps;

export function BodyStack(props: Props) {
  return <Stack spacing={6} {...props} />;
}
