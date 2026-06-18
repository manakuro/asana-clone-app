import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { useCopyProjectLink } from '@/hooks/pages/projects';

type Props = {
  projectId: string;
};

export const CopyProjectLink = memo(function CopyProjectLink(props: Props) {
  const { projectId } = props;
  const { copyProjectLink } = useCopyProjectLink({ projectId });

  const handleClick = useCallback(async () => {
    await copyProjectLink();
  }, [copyProjectLink]);

  return (
    <Menu.Item value="Copy project link" onSelect={handleClick}>
      <Icon icon="link" color="fg.muted" />
      Copy project link
    </Menu.Item>
  );
});
