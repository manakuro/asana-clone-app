import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import { useToaster } from '@/hooks/useToaster';
import { taskDetailURL } from '@/router';

type Props = {
  taskId: string;
};
export const CopyTask = memo(function CopyTask(props: Props) {
  const { toaster } = useToaster();

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(taskDetailURL(props.taskId));
    toaster.success({
      description: 'The task link was copied to your clipboard.',
    });
  }, [props.taskId, toaster.success]);

  return (
    <Menu.Item onSelect={handleClick} value="Copy task link">
      <Icon icon="link" color="fg.muted" />
      Copy task link
    </Menu.Item>
  );
});
