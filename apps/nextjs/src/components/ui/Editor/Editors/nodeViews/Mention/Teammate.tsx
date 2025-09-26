import { PopoverProfile } from '@/components/features/Popovers';
import { useReactNodeView } from '@/components/ui/Editor/Editors/ReactNodeView';
import type { MentionAttrs } from '@/shared/prosemirror/schema';
import { useTeammate } from '@/store/entities/teammate';
import { memo } from 'react';
import { MentionText } from './MentionText';

export const Teammate = memo(function Teammate() {
  const context = useReactNodeView();
  const attrs = context.node?.attrs as MentionAttrs;
  const { teammate } = useTeammate(attrs.mentionId);

  return (
    <PopoverProfile
      profile={{
        name: teammate.name,
        email: teammate.email,
        image: teammate.image,
      }}
    >
      <MentionText>{`${teammate.email} `}</MentionText>
    </PopoverProfile>
  );
});
