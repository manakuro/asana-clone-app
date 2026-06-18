import { memo, useCallback, useMemo } from 'react';
import {
  useTasksTaskColumn,
  useTasksTaskColumnIds,
} from '@/components/features/Tasks/hooks';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { MenuList } from './MenuList';

type Props = {
  onClosed?: () => void;
  onOpened?: () => void;
  onSort?: () => void;
  tasksTaskColumnId: string;
};

export const MoreAction = memo(function MoreAction(props: Props) {
  const { tasksTaskColumnId } = props;
  const { tasksTaskColumnIds } = useTasksTaskColumnIds();
  const { setTaskColumnOrder, canMoveLeft, canMoveRight, setTasksTaskColumn } =
    useTasksTaskColumn(tasksTaskColumnId);

  const handleHideColumn = useCallback(async () => {
    await setTasksTaskColumn({ disabled: true });
  }, [setTasksTaskColumn]);

  const handleMoveRight = useCallback(async () => {
    const currentIndex = tasksTaskColumnIds.indexOf(tasksTaskColumnId);
    await setTaskColumnOrder(currentIndex, currentIndex + 1);
  }, [setTaskColumnOrder, tasksTaskColumnId, tasksTaskColumnIds]);

  const handleMoveLeft = useCallback(async () => {
    const currentIndex = tasksTaskColumnIds.indexOf(tasksTaskColumnId);
    await setTaskColumnOrder(currentIndex, currentIndex - 1);
  }, [setTaskColumnOrder, tasksTaskColumnId, tasksTaskColumnIds]);

  const disabledMoveLeft = useMemo(
    () => !canMoveLeft(tasksTaskColumnId),
    [canMoveLeft, tasksTaskColumnId],
  );

  const disabledMoveRight = useMemo(
    () => !canMoveRight(tasksTaskColumnId),
    [canMoveRight, tasksTaskColumnId],
  );

  return (
    <Menu.Root
      positioning={{ placement: 'bottom-start' }}
      lazyMount
      onOpenChange={(e) => {
        if (e.open) {
          props.onOpened?.();
        } else {
          props.onClosed?.();
        }
      }}
    >
      <Menu.Trigger asChild>
        <IconButton aria-label="More actions" variant="ghost" size="sm">
          <Icon icon="chevronDown" color="fg.muted" />
        </IconButton>
      </Menu.Trigger>
      <MenuList
        onSort={props.onSort}
        onMoveRight={handleMoveRight}
        onMoveLeft={handleMoveLeft}
        onHideColumn={handleHideColumn}
        disabledMoveLeft={disabledMoveLeft}
        disabledMoveRight={disabledMoveRight}
      />
    </Menu.Root>
  );
});
