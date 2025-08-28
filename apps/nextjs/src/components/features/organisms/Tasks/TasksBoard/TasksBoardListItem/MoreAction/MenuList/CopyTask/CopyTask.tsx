import { Icon } from '@/components/ui/atoms';
import { MenuItem } from '@/components/ui/organisms/Menu';
import { useToast } from '@/hooks';
import { taskDetailURL } from '@/router';
import { memo, useCallback } from 'react';

type Props = {
  onMouseEnter: () => void;
  onCloseMenu: () => void;
  taskId: string;
};
export const CopyTask = memo(function CopyTask(props: Props) {
  const { onMouseEnter, onCloseMenu } = props;
  const { toast } = useToast();

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(taskDetailURL(props.taskId));
    toast({
      description: 'The task link was copied to your clipboard.',
    });
    onCloseMenu();
  }, [onCloseMenu, props.taskId, toast]);

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="link" color="text.muted" />}
      onClick={handleClick}
      isDisabled
    >
      Copy task link
    </MenuItem>
  );
});
