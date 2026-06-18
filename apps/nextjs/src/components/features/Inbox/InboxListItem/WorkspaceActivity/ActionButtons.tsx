import { memo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { useInboxContext } from '../../Inbox';
import { Actions, ArchiveButton } from '../Actions';
import { useInboxListItemContext } from '../Provider';

type Props = FlexProps;

export const ActionButtons = memo(function ActionButtons(_props: Props) {
  const { isHovering } = useInboxListItemContext();
  const { isArchive } = useInboxContext();

  if (isArchive) return null;

  return (
    <Actions visibility={isHovering ? 'visible' : 'hidden'}>
      <ArchiveButton disabled tooltipProps={{ content: 'Archive All' }} />
    </Actions>
  );
});
