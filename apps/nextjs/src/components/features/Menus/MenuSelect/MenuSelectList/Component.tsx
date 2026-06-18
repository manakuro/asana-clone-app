import type React from 'react';
import { useCallback } from 'react';
import {
  Menu,
  type MenuContentProps,
  type MenuRadioItemGroupProps,
} from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';
import { useMenuSelectContext } from '../useMenuSelect';

type Props = MenuRadioItemGroupProps & {
  menuListProps?: MenuContentProps;
};
export type ComponentProps = Props;

export function Component(props: Props) {
  const { menuListProps, ...rest } = props;
  const { onChange, listStatus } = useMenuSelectContext();

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
      <Menu.Positioner>
        <Menu.Content onClick={handleClickMenuList} {...menuListProps}>
          <Menu.RadioItemGroup
            value={listStatus as unknown as string}
            onValueChange={(e) => handleChange(e.value)}
            {...rest}
          />
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  );
}
