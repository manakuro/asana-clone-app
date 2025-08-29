import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import { useCopyProjectLink } from '@/hooks/pages/projects';
import type React from 'react';
import { memo, useCallback } from 'react';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const CopyProjectLink = memo(function CopyProjectLink(props: Props) {
  const { onMouseEnter, projectId, onClose } = props;
  const { copyProjectLink } = useCopyProjectLink({ projectId });

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();

      await copyProjectLink();
    },
    [copyProjectLink, onClose],
  );

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="link" color="text.muted" />}
      onClick={handleClick}
    >
      Copy project link
    </MenuItem>
  );
});
