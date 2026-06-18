import { memo } from 'react';
import { useReactNodeView } from '@/components/ui/editor/editors';
import type { EmojiAttrs } from '@/shared/prosemirror/schema';

export const Emoji = memo(function Emoji() {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as EmojiAttrs;

  return <>{attrs.emoji}</>;
});
