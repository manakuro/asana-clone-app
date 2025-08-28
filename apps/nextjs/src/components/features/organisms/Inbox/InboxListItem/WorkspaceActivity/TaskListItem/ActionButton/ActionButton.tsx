import { useInboxContext } from '@/components/features/organisms/Inbox';
import type { IconButtonProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { ArchiveButton } from './ArchiveButton';
import { MoveToInboxButton } from './MoveToInboxButton';

type Props = {
  taskId: string;
} & Omit<IconButtonProps, 'aria-label'>;

export const ActionButton = memo(function ActionButton(props: Props) {
  const { isActivity } = useInboxContext();

  if (isActivity) {
    return <ArchiveButton {...props} />;
  }

  return <MoveToInboxButton {...props} />;
});
