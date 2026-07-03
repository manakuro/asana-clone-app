import { memo } from 'react';
import type { FlexProps } from '@/components/ui/flex';
import { useInboxContext } from '../../inbox';
import { Actions, ArchiveButton } from '../actions';
import { useInboxListItemContext } from '../context';

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
