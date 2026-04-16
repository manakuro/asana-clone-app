import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import { useToaster } from '@/hooks/useToaster';
import { taskDetailURL } from '@/router';

type Props = {
  onMouseEnter: () => void;
  onCloseMenu: () => void;
  taskId: string;
};
export const CopyTask = memo(function CopyTask(props: Props) {
  const { onMouseEnter, onCloseMenu } = props;
  const { toaster } = useToaster();

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(taskDetailURL(props.taskId));
    toaster.success({
      description: 'The task link was copied to your clipboard.',
    });
    onCloseMenu();
  }, [onCloseMenu, props.taskId, toaster.success]);

  return (
    <Menu.Item
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      disabled
      value=""
    >
      <Icon icon="link" color="text.muted" />
      Copy task link
    </Menu.Item>
  );
});
