import { memo, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Icon } from '@/components/ui/Icon';
import { Separator } from '@/components/ui/Separator';
import { useShareProjectModal } from '../useShareProjectModal';

export const Members = memo(function Members() {
  const { onClose } = useShareProjectModal();

  const handleCopyProjectLink = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      <Separator />
      <Dialog.Footer>
        <Button onClick={handleCopyProjectLink} variant="outline" size="xs">
          <Icon icon="link" color="text.muted" />
          Copy project link
        </Button>
      </Dialog.Footer>
    </>
  );
});
