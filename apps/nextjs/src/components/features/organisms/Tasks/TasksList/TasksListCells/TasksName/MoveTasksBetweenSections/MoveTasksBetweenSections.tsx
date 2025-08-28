import {
  MenuSelect,
  MenuSelectButton,
} from '@/components/features/organisms/Menus';
import { useTasksTask } from '@/components/features/organisms/Tasks/hooks';
import { Icon } from '@/components/ui/atoms';
import { Tooltip } from '@/components/ui/molecules';
import { useClickableHoverStyle } from '@/hooks';
import type React from 'react';
import { memo, useCallback } from 'react';
import { MenuList } from './MenuList';

type Props = {
  taskId: string;
  onOpened?: () => void;
  onClosed?: () => void;
};

export const MoveTasksBetweenSections: React.FC<Props> = memo<Props>(
  (props) => {
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
  },
);
