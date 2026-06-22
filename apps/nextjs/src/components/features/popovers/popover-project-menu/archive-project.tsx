import type React from 'react';
import { useCallback } from 'react';
import { Menu } from '@/components/ui/menu';

type Props = {
  projectId: string;
};

export function ArchiveProject(props: Props) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(props.projectId);
    },
    [props.projectId],
  );

  return (
    <Menu.Item value="Archive Project" onClick={handleClick} disabled>
      Archive Project
    </Menu.Item>
  );
}
