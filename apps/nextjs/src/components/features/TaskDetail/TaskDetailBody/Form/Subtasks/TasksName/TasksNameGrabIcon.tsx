import { memo } from 'react';
import { Icon, type IconProps } from '@/components/ui/icon';
import { useSubtasksNameContext } from './Provider';

type Props = Omit<IconProps, 'icon'>;

export const TasksNameGrabIcon = memo(function TasksNameGrabIcon(props: Props) {
  const { showIcon } = useSubtasksNameContext();
  return (
    <Icon
      icon="gridVertical"
      color="fg.muted"
      size="sm"
      visibility={showIcon ? 'visible' : 'hidden'}
      cursor="grab"
      {...props}
    />
  );
});
