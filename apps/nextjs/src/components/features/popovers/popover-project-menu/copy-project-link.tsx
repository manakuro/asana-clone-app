import type React from 'react';
import { useCallback } from 'react';
import { Menu } from '@/components/ui/menu';
import { useCopyProjectLink } from '@/hooks/pages/projects';

type Props = {
  projectId: string;
};

export function CopyProjectLink(props: Props) {
  const { projectId } = props;
  const { copyProjectLink } = useCopyProjectLink({ projectId });

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      await copyProjectLink();
    },
    [copyProjectLink],
  );

  return (
    <Menu.Item value="Copy Project Link" onClick={handleClick}>
      Copy Project Link
    </Menu.Item>
  );
}
