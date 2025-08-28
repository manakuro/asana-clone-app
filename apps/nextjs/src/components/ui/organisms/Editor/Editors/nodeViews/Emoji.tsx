import { useReactNodeView } from '@/components/ui/organisms/Editor/Editors';
import type { EmojiAttrs } from '@/shared/prosemirror/schema';
import type React from 'react';
import { memo } from 'react';

export const Emoji: React.FC = memo(() => {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as EmojiAttrs;

  return <>{attrs.emoji}</>;
});
