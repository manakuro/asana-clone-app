import { Icon, type IconProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { useSubtasksNameContext } from './Provider';

type Props = Omit<IconProps, 'icon'>;

export const TasksNameGrabIcon = memo(function TasksNameGrabIcon(props: Props) {
  const { showIcon } = useSubtasksNameContext();
  return (
    <Icon
      icon="gridVertical"
      color="text.muted"
      size="sm"
      visibility={showIcon ? 'visible' : 'hidden'}
      cursor="grab"
      {...props}
    />
  );
});
