import type { FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { useInboxContext } from '../../Inbox';
import { Actions, ArchiveButton } from '../Actions';
import { useInboxListItemContext } from '../Provider';

type Props = FlexProps;

export const ActionButtons = memo(function ActionButtons(props: Props) {
  const { isHovering } = useInboxListItemContext();
  const { isArchive } = useInboxContext();

  if (isArchive) return null;

  return (
    <Actions visibility={isHovering ? 'visible' : 'hidden'}>
      <ArchiveButton isDisabled tooltipProps={{ label: 'Archive All' }} />
    </Actions>
  );
});
