import type React from 'react';
import { useCallback } from 'react';
import { MenuItem } from './MenuItem';

type Props = {
  projectId: string;
  onClose: () => void;
  onMouseEnter: () => void;
};

export function ArchiveProject(props: Props) {
  const { onClose, onMouseEnter } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick} isDisabled>
      Archive Project
    </MenuItem>
  );
}
