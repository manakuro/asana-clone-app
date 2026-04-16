import type React from 'react';
import { useCallback } from 'react';
import { Menu } from '@/components/ui/Menu';
import { useCopyProjectLink } from '@/hooks/pages/projects';

type Props = {
  projectId: string;
  onClose: () => void;
  onMouseEnter: () => void;
};

export function CopyProjectLink(props: Props) {
  const { projectId, onClose, onMouseEnter } = props;
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
      Copy Project Link
    </Menu.Item>
  );
}
