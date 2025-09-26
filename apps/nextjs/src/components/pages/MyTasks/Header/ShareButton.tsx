import { useShareWorkspaceModal } from '@/components/features/organisms/Modals/ShareWorkspaceModal';
import { Tooltip } from '@/components/ui/Tooltip';
import { useTooltip } from '@/components/ui/Tooltip/useTooltip';
import { Button } from '@/components/ui/atoms/Button';
import { Flex } from '@/components/ui/atoms/Flex';
import { Icon } from '@/components/ui/atoms/Icon';
import { memo, useCallback } from 'react';

export const ShareButton = memo(function ShareButton() {
  const { setIsOpen } = useShareWorkspaceModal();
  const { isOpen, ref } = useTooltip();

  const handleShareWorkspace = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Flex alignItems="center">
      <Tooltip
        isOpen={isOpen}
        hasArrow
        label="Share this space with teammates to let them organize your work."
        aria-label="A share button description"
        size="md"
      >
        <Button
          ref={ref}
          leftIcon={<Icon icon="lockAlt" mt="-1px" size="xs" />}
          variant="outline"
          size="xs"
          onClick={handleShareWorkspace}
        >
          Share
        </Button>
      </Tooltip>
    </Flex>
  );
});
