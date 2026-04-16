import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/Menu';
import { Portal } from '@/components/ui/Portal';

type Props = {
  onSort?: () => void;
  onMoveRight?: () => void;
  onMoveLeft?: () => void;
  onHideColumn?: () => void;
  disabledMoveLeft?: boolean;
  disabledMoveRight?: boolean;
};

export const MenuList = memo(function MenuList(props: Props) {
  const { onSort, onHideColumn, onMoveLeft, onMoveRight } = props;
  const handleSortBy = useCallback(() => {
    onSort?.();
  }, [onSort]);

  const handleMoveRight = useCallback(() => {
    onMoveRight?.();
  }, [onMoveRight]);

  const handleMoveLeft = useCallback(() => {
    onMoveLeft?.();
  }, [onMoveLeft]);

  const handleHideColumn = useCallback(() => {
    onHideColumn?.();
  }, [onHideColumn]);

  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content color="text.base">
          {props.onSort && (
            <Menu.Item onClick={handleSortBy} value="">
              Sort by
            </Menu.Item>
          )}
          <Menu.Item
            onClick={handleMoveLeft}
            disabled={props.disabledMoveLeft}
            value=""
          >
            Move left
          </Menu.Item>
          <Menu.Item
            onClick={handleMoveRight}
            disabled={props.disabledMoveRight}
            value=""
          >
            Move right
          </Menu.Item>
          <Menu.Item onClick={handleHideColumn} value="">
            Hide column
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
});
