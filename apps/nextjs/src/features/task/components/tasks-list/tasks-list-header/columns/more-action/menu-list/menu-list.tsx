import { memo, useCallback } from 'react';
import { Menu } from '@/components/ui/menu';

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
    <Menu.Positioner>
      <Menu.Content color="fg">
        {props.onSort && (
          <Menu.Item onSelect={handleSortBy} value="Sort by">
            Sort by
          </Menu.Item>
        )}
        <Menu.Item
          onSelect={handleMoveLeft}
          disabled={props.disabledMoveLeft}
          value="Move left"
        >
          Move left
        </Menu.Item>
        <Menu.Item
          onSelect={handleMoveRight}
          disabled={props.disabledMoveRight}
          value="Move right"
        >
          Move right
        </Menu.Item>
        <Menu.Item onSelect={handleHideColumn} value="Hide column">
          Hide column
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  );
});
