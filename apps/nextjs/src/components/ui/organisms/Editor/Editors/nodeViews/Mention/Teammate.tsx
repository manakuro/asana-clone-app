import { PopoverProfile } from '@/components/features/organisms/Popovers';
import { useReactNodeView } from '@/components/ui/organisms/Editor/Editors/ReactNodeView';
import type { MentionAttrs } from '@/shared/prosemirror/schema';
import { useTeammate } from '@/store/entities/teammate';
import type React from 'react';
import { memo } from 'react';
import { MentionText } from './MentionText';

export const Teammate: React.FC = memo(() => {
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
