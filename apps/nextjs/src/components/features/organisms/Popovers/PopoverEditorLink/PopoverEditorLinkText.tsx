import {
  MentionText,
  type MentionTextProps,
} from '@/components/ui/organisms/Editor/Editors/nodeViews/Mention/MentionText';

type Props = MentionTextProps;

export function PopoverEditorLinkText(props: Props) {
  return <MentionText fontSize="sm" ml={3} flex={1} {...props} />;
}
