import { memo } from 'react';
import { useInboxContext } from '@/components/features/inbox/inbox/provider';
import type { IconButtonProps } from '@/components/ui/icon-button';
import { ArchiveButton } from './archive-button';
import { MoveToInboxButton } from './move-to-inbox-button';

type Props = Omit<IconButtonProps, 'aria-label'>;

export const ActionButton = memo(function ActionButton(props: Props) {
  const { isActivity } = useInboxContext();

  if (isActivity) {
    return <ArchiveButton {...props} />;
  }

  return <MoveToInboxButton {...props} />;
});
