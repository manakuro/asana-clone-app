import { memo, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Icon } from '@/components/ui/Icon';
import { Separator } from '@/components/ui/Separator';
import { useCopyProjectLink } from '@/hooks/pages/projects';
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
      <Separator />
      <Dialog.Footer>
        {hasInvitedTeammates ? (
          <Button onClick={handleSend} colorScheme="teal" size="sm" mr="auto">
            Send
          </Button>
        ) : (
          <Button onClick={handleCopyProjectLink} variant="outline" size="xs">
            <Icon icon="link" color="text.muted" />
            Copy project link
          </Button>
        )}
      </Dialog.Footer>
    </>
  );
});
