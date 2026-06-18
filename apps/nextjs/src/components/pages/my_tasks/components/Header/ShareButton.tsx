import { memo, useCallback } from 'react';
import { useShareWorkspaceModal } from '@/components/features/Modals/ShareWorkspaceModal';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Icon } from '@/components/ui/icon';
import { Tooltip } from '@/components/ui/tooltip';
import { useTooltip } from '@/components/ui/tooltip/use-tooltip';

export const ShareButton = memo(function ShareButton() {
  const { setIsOpen } = useShareWorkspaceModal();
  const { open, ref } = useTooltip<HTMLButtonElement>();

  const handleShareWorkspace = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Flex alignItems="center">
      <Tooltip
        open={open}
        showArrow
        content="Share this space with teammates to let them organize your work."
        aria-label="A share button description"
        size="md"
      >
        <Button
          ref={ref}
          variant="outline"
          size="xs"
          onClick={handleShareWorkspace}
        >
          <Icon icon="lockAlt" mt="-1px" size="xs" />
          Share
        </Button>
      </Tooltip>
    </Flex>
  );
});
