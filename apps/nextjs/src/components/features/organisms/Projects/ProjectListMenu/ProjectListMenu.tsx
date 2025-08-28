import { Icon, IconButton, Portal } from '@/components/ui/atoms';
import {
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@/components/ui/organisms/Menu';
import { memo, useCallback } from 'react';

type Props = {
  listStatus: ProjectListStatus;
  onChange: (listStatus: ProjectListStatus) => void;
};

export const PROJECT_LIST_MENU_VIEW_AS_TILES = '1' as const;
export const PROJECT_LIST_MENU_VIEW_AS_LIST = '2' as const;
export type ProjectListStatus =
  | typeof PROJECT_LIST_MENU_VIEW_AS_TILES
  | typeof PROJECT_LIST_MENU_VIEW_AS_LIST;

export const ProjectListMenu = memo(function ProjectListMenu(props: Props) {
  const handleClickViewAsTitles = useCallback(() => {
    props.onChange(PROJECT_LIST_MENU_VIEW_AS_TILES);
  }, [props]);

  const handleClickViewAsList = useCallback(() => {
    props.onChange(PROJECT_LIST_MENU_VIEW_AS_LIST);
  }, [props]);

  return (
    <Menu placement="bottom-start" isLazy>
      <MenuButton
        as={IconButton}
        aria-label="list icon"
        icon={<Icon icon="table" color="text.muted" size="sm" />}
        variant="ghost"
      />
      <Portal>
        <MenuList>
          <MenuOptionGroup value={props.listStatus} type="radio">
            <MenuItemOption
              onClick={handleClickViewAsTitles}
              value={PROJECT_LIST_MENU_VIEW_AS_TILES}
            >
              View as tiles
            </MenuItemOption>
            <MenuItemOption
              onClick={handleClickViewAsList}
              value={PROJECT_LIST_MENU_VIEW_AS_LIST}
            >
              View as list
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Portal>
    </Menu>
  );
});
