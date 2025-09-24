import { Text, type TextProps } from '@/components/ui/atoms';
import { useLinkStyle } from '@/hooks/styles';

type Props = TextProps;
export type MentionTextProps = Props;

export function MentionText(props: Props) {
  const { style } = useLinkStyle();
  return <Text as="span" {...style} {...props} />;
}
