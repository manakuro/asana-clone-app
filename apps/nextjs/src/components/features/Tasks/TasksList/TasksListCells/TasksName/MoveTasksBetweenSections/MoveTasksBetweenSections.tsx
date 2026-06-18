import { memo, useCallback } from 'react';
import { MenuSelect, MenuSelectTrigger } from '@/components/features/Menus';
import { useTasksTask } from '@/components/features/Tasks/hooks';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';
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
            <MenuSelectTrigger>
              <IconButton unstyled>
                <Icon
                  icon="moveVertical"
                  color="fg.muted"
                  {...clickableHoverLightStyle}
                />
              </IconButton>
            </MenuSelectTrigger>
          </Tooltip>
          {open && <MenuList taskId={props.taskId} />}
        </>
      )}
    </MenuSelect>
  );
});
