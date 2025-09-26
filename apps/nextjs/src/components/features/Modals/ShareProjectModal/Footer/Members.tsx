import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Icon } from '@/components/ui/Icon';
import { ModalFooter } from '@/components/ui/Modal';
import { memo, useCallback } from 'react';
import { useShareProjectModal } from '../useShareProjectModal';

export const Members = memo(function Members() {
  const { onClose } = useShareProjectModal();

  const handleCopyProjectLink = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      <Divider />
      <ModalFooter>
        <Button
          onClick={handleCopyProjectLink}
          variant="outline"
          leftIcon={<Icon icon="link" color="text.muted" />}
          size="xs"
        >
          Copy project link
        </Button>
      </ModalFooter>
    </>
  );
});
