import { ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/atoms/Button';
import { Divider } from '@/components/ui/atoms/Divider';
import { Icon } from '@/components/ui/atoms/Icon';
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
