import type React from 'react';
import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { useCopyProjectLink } from '@/hooks/pages/projects';

type Props = {
  onClose: () => void;
  onMouseEnter: () => void;
  projectId: string;
};

export const CopyProjectLink = memo(function CopyProjectLink(props: Props) {
  const { onMouseEnter, projectId, onClose } = props;
  const { copyProjectLink } = useCopyProjectLink({ projectId });

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();

      await copyProjectLink();
    },
    [copyProjectLink, onClose],
  );

  return (
    <Menu.Item value="" onMouseEnter={onMouseEnter} onClick={handleClick}>
      <Icon icon="link" color="text.muted" />
      Copy project link
    </Menu.Item>
  );
});
