import type React from 'react';
import { useCallback } from 'react';
import { Menu } from '@/components/ui/Menu';

type Props = {
  projectId: string;
};

export function DuplicateProject(props: Props) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  return (
    <Menu.Item value="Duplicate Project" onClick={handleClick} disabled>
      Duplicate Project
    </Menu.Item>
  );
}
