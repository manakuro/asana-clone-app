import { memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { useCopyProjectLink } from '@/hooks/pages/projects';
import { useShareProjectModal } from '../useShareProjectModal';

export const Members = memo(function Members() {
  const { projectId } = useShareProjectModal();
  const { copyProjectLink } = useCopyProjectLink({ projectId });

  const handleCopyProjectLink = useCallback(async () => {
    await copyProjectLink();
  }, [copyProjectLink]);

  return (
    <>
      <Separator />
      <Dialog.Footer>
        <Button onClick={handleCopyProjectLink} variant="outline" size="xs">
          <Icon icon="link" color="fg.muted" />
          Copy project link
        </Button>
      </Dialog.Footer>
    </>
  );
});
