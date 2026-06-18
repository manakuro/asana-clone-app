import { memo, useCallback, useState } from 'react';
import { PopoverAssigneeInput } from '@/components/features/Popovers';
import { TeammateAvatar } from '@/components/features/TeammateAvatar';
import { Icon } from '@/components/ui/icon';
import { Tooltip } from '@/components/ui/tooltip';
import { useClickableHoverStyle } from '@/hooks';
import { useTeammate } from '@/store/entities/teammate';

type Props = {
  taskId: string;
  assigneeId: string;
  onAssigneeOpened: () => void;
  onAssigneeClosed: () => void;
  showIcon: boolean;
};

export const AssigneeIconMenu = memo(function AssigneeIconMenu(props: Props) {
  const { taskId, assigneeId, onAssigneeClosed, onAssigneeOpened, showIcon } =
    props;
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { teammate } = useTeammate(assigneeId);
  const [showProfile, setShowProfile] = useState(true);

  const handleOpened = useCallback(() => {
    setShowProfile(false);
    onAssigneeOpened();
  }, [onAssigneeOpened]);

  const handleClosed = useCallback(() => {
    onAssigneeClosed();
    setShowProfile(true);
  }, [onAssigneeClosed]);

  return (
    <PopoverAssigneeInput
      taskId={taskId}
      onOpened={handleOpened}
      onClosed={handleClosed}
    >
      {teammate.id ? (
        <TeammateAvatar
          teammateId={teammate.id}
          size="xs"
          showProfile={showProfile}
        />
      ) : (
        <Tooltip
          showArrow
          content="Assign this task"
          aria-label="Assign this task"
          size="sm"
          withIcon
        >
          <Icon
            visibility={showIcon ? 'visible' : 'hidden'}
            pointerEvents={showIcon ? 'auto' : 'none'}
            icon="user"
            color="fg.muted"
            {...clickableHoverLightStyle}
          />
        </Tooltip>
      )}
    </PopoverAssigneeInput>
  );
});
