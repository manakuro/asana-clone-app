import { Text, type TextProps } from '@/components/ui/text';
import { useLinkStyle } from '@/hooks/styles/use-link-style';

type Props = TextProps;
export type MentionTextProps = Props;

export function MentionText(props: Props) {
  const { style } = useLinkStyle();
  return <Text as="span" {...style} {...props} />;
}
