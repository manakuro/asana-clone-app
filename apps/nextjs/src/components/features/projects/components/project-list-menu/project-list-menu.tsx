import { memo, useCallback } from 'react';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Menu } from '@/components/ui/menu';
import { Portal } from '@/components/ui/portal';

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
    <Menu.Root positioning={{ placement: 'bottom-start' }} lazyMount>
      <Menu.Trigger asChild>
        <IconButton aria-label="list icon" variant="ghost">
          <Icon icon="table" color="fg.muted" size="sm" />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.RadioItemGroup value={props.listStatus}>
              <Menu.RadioItem
                onClick={handleClickViewAsTitles}
                value={PROJECT_LIST_MENU_VIEW_AS_TILES}
              >
                View as tiles
                <Menu.ItemIndicator />
              </Menu.RadioItem>
              <Menu.RadioItem
                onClick={handleClickViewAsList}
                value={PROJECT_LIST_MENU_VIEW_AS_LIST}
              >
                View as list
                <Menu.ItemIndicator />
              </Menu.RadioItem>
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
});
