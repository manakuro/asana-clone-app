import { Portal } from '@/components/ui/atoms';
import {
  MenuList as AtomsMenuList,
  type MenuListProps,
  MenuOptionGroup,
  type MenuOptionGroupProps,
} from '@/components/ui/organisms/Menu';
import { useClickOutside } from '@/hooks/useClickOutside';
import type React from 'react';
import { useCallback } from 'react';
import { useMenuSelectContext } from '../useMenuSelect';

type Props = MenuOptionGroupProps & {
  menuListProps?: MenuListProps;
};
export type ComponentProps = Props;

export function Component(props: Props) {
  const { menuListProps, ...rest } = props;
  const { onChange, onClose, listStatus } = useMenuSelectContext();
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: () => true,
  });

  const handleChange = useCallback(
    (listStatus: string | string[] | undefined) => {
      if (listStatus === undefined) return;
      onChange(listStatus);
    },
    [onChange],
  );
  const handleClickMenuList = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    },
    [],
  );

  return (
    <Portal>
      <AtomsMenuList ref={ref} onClick={handleClickMenuList} {...menuListProps}>
        <MenuOptionGroup
          value={listStatus as unknown as string}
          type="radio"
          onChange={handleChange}
          {...rest}
        />
      </AtomsMenuList>
    </Portal>
  );
}
