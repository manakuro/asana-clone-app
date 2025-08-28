import {
  MenuList as AtomsMenuList,
  MenuItem,
} from '@/components/ui/organisms/Menu';
import { memo, useCallback } from 'react';

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
    <AtomsMenuList color="text.base">
      {props.onSort && <MenuItem onClick={handleSortBy}>Sort by</MenuItem>}
      <MenuItem onClick={handleMoveLeft} isDisabled={props.disabledMoveLeft}>
        Move left
      </MenuItem>
      <MenuItem onClick={handleMoveRight} isDisabled={props.disabledMoveRight}>
        Move right
      </MenuItem>
      <MenuItem onClick={handleHideColumn}>Hide column</MenuItem>
    </AtomsMenuList>
  );
});
