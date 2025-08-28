import { useInboxContext } from '@/components/features/organisms/Inbox';
import type { FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
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
          isDisabled
          tooltipProps={{ label: 'Archive notification' }}
        />
      )}
      {isArchive && (
        <MoveToInboxButton
          isDisabled
          tooltipProps={{ label: 'Move to Inbox' }}
        />
      )}
    </Actions>
  );
});
