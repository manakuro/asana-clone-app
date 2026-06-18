import { memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
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
    await copyProjectLink();
  }, [copyProjectLink]);

  return (
    <>
      <Separator />
      <Dialog.Footer>
        {hasInvitedTeammates ? (
          <Button onClick={handleSend} colorPalette="teal" size="sm" mr="auto">
            Send
          </Button>
        ) : (
          <Button onClick={handleCopyProjectLink} variant="outline" size="xs">
            <Icon icon="link" color="fg.muted" />
            Copy project link
          </Button>
        )}
      </Dialog.Footer>
    </>
  );
});
