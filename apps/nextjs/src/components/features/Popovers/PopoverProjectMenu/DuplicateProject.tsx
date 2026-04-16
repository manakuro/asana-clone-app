import type React from 'react';
import { useCallback } from 'react';
import { Menu } from '@/components/ui/Menu';

type Props = {
  projectId: string;
  onClose: () => void;
  onMouseEnter: () => void;
};

export function DuplicateProject(props: Props) {
  const { onClose, onMouseEnter } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  return (
    <Menu.Item
      value=""
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      disabled
    >
      Duplicate Project
    </Menu.Item>
  );
}
