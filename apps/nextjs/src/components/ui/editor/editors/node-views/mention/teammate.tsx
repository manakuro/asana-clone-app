import { memo } from 'react';
import { useReactNodeView } from '@/components/ui/editor/editors/react-node-view';
import { PopoverProfile } from '@/features/teammates/components/popover-profile/popover-profile';
import type { MentionAttrs } from '@/lib/prosemirror/schema';
import { useTeammate } from '@/store/entities/teammate';
import { MentionText } from './mention-text';

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
      portal={false}
    >
      <MentionText>{`${teammate.email} `}</MentionText>
    </PopoverProfile>
  );
});
