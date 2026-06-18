import { Menu, type MenuRootProps } from '@/components/ui/menu';
import { type MaybeRenderProp, runIfFn } from '@/shared/utils';
import { Context, type UseMenuSelect, useMenuSelect } from './useMenuSelect';

type Props<ListStatus> = {
  onChange: (listStatus: ListStatus) => void;
  listStatus?: ListStatus;
  onOpened?: () => void;
  onClosed?: () => void;
  children: MaybeRenderProp<UseMenuSelect<ListStatus>>;
} & Omit<MenuRootProps, 'children'>;

export const MenuSelect = <ListStatus,>(props: Props<ListStatus>) => {
  const { listStatus, onOpened, onClosed, onChange, ...rest } = props;

  const useMenuSelectResult = useMenuSelect({
    listStatus,
    onOpened,
    onClosed,
    onChange,
  });

  return (
    <Context.Provider value={useMenuSelectResult}>
      <Menu.Root
        open={useMenuSelectResult.open}
        onOpenChange={(e) => {
          if (e.open) {
            useMenuSelectResult.onOpen();
          } else {
            useMenuSelectResult.onClose();
          }
        }}
        lazyMount
        {...rest}
      >
        {runIfFn(props.children, useMenuSelectResult)}
      </Menu.Root>
    </Context.Provider>
  );
};
