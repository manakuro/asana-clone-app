import { MenuSelect, MenuSelectButton } from '@/components/features/Menus';
import { useTasksTask } from '@/components/features/Tasks/hooks';
import { Icon } from '@/components/ui/Icon';
import { Tooltip } from '@/components/ui/Tooltip';
import { useClickableHoverStyle } from '@/hooks';
import { memo, useCallback } from 'react';
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
      placement="bottom-end"
    >
      {({ isOpen }) => (
        <>
          <Tooltip
            hasArrow
            label="Move tasks between sections"
            aria-label="Move tasks between sections"
            size="md"
            withIcon
            display={isOpen ? 'none' : 'block'}
          >
            <MenuSelectButton
              spanStyle={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon
                icon="moveVertical"
                color="text.muted"
                {...clickableHoverLightStyle}
              />
            </MenuSelectButton>
          </Tooltip>
          {isOpen && <MenuList taskId={props.taskId} />}
        </>
      )}
    </MenuSelect>
  );
});
