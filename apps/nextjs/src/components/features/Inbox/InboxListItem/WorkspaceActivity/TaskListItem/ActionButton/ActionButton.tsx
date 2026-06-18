import { memo } from 'react';
import { useInboxContext } from '@/components/features/Inbox';
import type { IconButtonProps } from '@/components/ui/icon-button';
import { ArchiveButton } from './ArchiveButton';
import { MoveToInboxButton } from './MoveToInboxButton';

type Props = Omit<IconButtonProps, 'aria-label'>;

export const ActionButton = memo(function ActionButton(props: Props) {
  const { isActivity } = useInboxContext();

  if (isActivity) {
    return <ArchiveButton {...props} />;
  }

  return <MoveToInboxButton {...props} />;
});
