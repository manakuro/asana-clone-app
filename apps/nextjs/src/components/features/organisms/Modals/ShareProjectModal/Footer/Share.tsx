import { ModalFooter } from '@/components/ui/Modal';
import { Button, Divider, Icon } from '@/components/ui/atoms';
import { useCopyProjectLink } from '@/hooks/pages/projects';
import { memo, useCallback } from 'react';
import { useShareProjectModal } from '../useShareProjectModal';
import { useShareProjectModalInvitedTeammates } from '../useShareProjectModalInvitedTeammates';

export const Share = memo(function Share() {
  const { onClose, projectId } = useShareProjectModal();
  const { hasInvitedTeammates } = useShareProjectModalInvitedTeammates();
  const { copyProjectLink } = useCopyProjectLink({ projectId });

  const handleSend = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCopyProjectLink = useCallback(async () => {
    onClose();

    await copyProjectLink();
  }, [copyProjectLink, onClose]);

  return (
    <>
      <Divider />
      <ModalFooter>
        {hasInvitedTeammates ? (
          <Button onClick={handleSend} colorScheme="teal" size="sm" mr="auto">
            Send
          </Button>
        ) : (
          <Button
            onClick={handleCopyProjectLink}
            variant="outline"
            leftIcon={<Icon icon="link" color="text.muted" />}
            size="xs"
          >
            Copy project link
          </Button>
        )}
      </ModalFooter>
    </>
  );
});
