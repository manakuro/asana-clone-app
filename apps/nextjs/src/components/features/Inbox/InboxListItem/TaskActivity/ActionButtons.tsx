import { memo } from 'react';
import { useInboxContext } from '@/components/features/Inbox';
import type { FlexProps } from '@/components/ui/flex';
import { Actions, ArchiveButton, MoveToInboxButton } from '../Actions';
import { useInboxListItemContext } from '../Provider';

type Props = FlexProps;

export const ActionButtons = memo<Props>(function ActionButtons() {
  const { isHovering } = useInboxListItemContext();
  const { isArchive, isActivity } = useInboxContext();

  return (
    <Actions visibility={isHovering ? 'visible' : 'hidden'}>
      {isActivity && (
        <ArchiveButton
          disabled
          tooltipProps={{ content: 'Archive notification' }}
        />
      )}
      {isArchive && (
        <MoveToInboxButton
          disabled
          tooltipProps={{ content: 'Move to Inbox' }}
        />
      )}
    </Actions>
  );
});
