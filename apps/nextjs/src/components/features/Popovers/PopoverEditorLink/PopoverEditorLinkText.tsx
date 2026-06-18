import {
  MentionText,
  type MentionTextProps,
} from '@/components/ui/editor/editors/node-views/mention/mention-text';

type Props = MentionTextProps;

export function PopoverEditorLinkText(props: Props) {
  return <MentionText fontSize="sm" ml={3} flex={1} {...props} />;
}
