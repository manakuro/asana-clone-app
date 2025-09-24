import { useReactNodeView } from '@/components/ui/organisms/Editor/Editors';
import type { EmojiAttrs } from '@/shared/prosemirror/schema';
import { memo } from 'react';

export const Emoji = memo(function Emoji() {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as EmojiAttrs;

  return <>{attrs.emoji}</>;
});
