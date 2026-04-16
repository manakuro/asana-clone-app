import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from '@/components/features/Menus';
import { Icon } from '@/components/ui/Icon';
import { Menu } from '@/components/ui/Menu';
import type { TaskListSortStatusCodeValue } from '@/store/entities/taskListSortStatus';

type Props<T extends TaskListSortStatusCodeValue> = {
  items: {
    value: T;
    text: string;
  }[];
  onChange: (status: T) => void;
  text: string;
  defaultValue: string;
};

export const SortMenu = <T extends TaskListSortStatusCodeValue>(
  props: Props<T>,
) => {
  const { items, onChange, text, defaultValue } = props;

  return (
    <MenuSelect<T>
      onChange={onChange}
      positioning={{ placement: 'bottom-end' }}
    >
      <MenuSelectButton variant="ghost" aria-label="Sort tasks" size="xs">
        <Icon icon="sort" />
        Sort{text}
      </MenuSelectButton>
      <MenuSelectList defaultValue={defaultValue}>
        {items.map((item, _i) => (
          <Menu.RadioItem
            value={item.value.toString()}
            key={item.value.toString()}
          >
            {item.text}
            <Menu.ItemIndicator />
          </Menu.RadioItem>
        ))}
      </MenuSelectList>
    </MenuSelect>
  );
};
