import { memo, useCallback } from 'react';
import { MenuSelect, MenuSelectButton } from '@/components/features/Menus';
import { useTasksTask } from '@/components/features/Tasks/hooks';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';
import { useClickableHoverStyle } from '@/hooks';
import { MenuList } from './MenuList';

type Props = {
  taskId: string;
  onOpened?: () => void;
  onClosed?: () => void;
};

export const MoveTasksBetweenSections = memo(function MoveTasksBetweenSections(
  props: Props,
) {
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { setTaskSectionId } = useTasksTask();

  const handleChange = useCallback(
    async (taskSectionId: string) => {
      await setTaskSectionId({ taskSectionId, taskId: props.taskId });
    },
    [props.taskId, setTaskSectionId],
  );

  return (
    <MenuSelect<string>
      onChange={handleChange}
      onClosed={props.onClosed}
      onOpened={props.onOpened}
      positioning={{ placement: 'bottom-end' }}
    >
      {({ open }) => (
        <>
          <Tooltip
            showArrow
            content="Move tasks between sections"
            aria-label="Move tasks between sections"
            size="md"
            withIcon
            contentProps={{ display: open ? 'none' : 'block' }}
          >
            <MenuSelectButton as={IconButton}>
              <Icon
                icon="moveVertical"
                color="text.muted"
                {...clickableHoverLightStyle}
              />
            </MenuSelectButton>
          </Tooltip>
          {open && <MenuList taskId={props.taskId} />}
        </>
      )}
    </MenuSelect>
  );
});
