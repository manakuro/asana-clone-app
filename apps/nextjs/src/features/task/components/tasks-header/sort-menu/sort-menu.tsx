import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import {
  MenuSelect,
  MenuSelectList,
  MenuSelectTrigger,
} from '@/components/ui/menu-select';
import type { TaskListSortStatusCodeValue } from '@/features/task/store/task-list-sort-status';

type Props<T extends TaskListSortStatusCodeValue> = {
  items: {
    value: T;
    text: string;
  }[];
  onChange: (status: T) => void;
  text: string;
  value: string;
};

export const SortMenu = <T extends TaskListSortStatusCodeValue>(
  props: Props<T>,
) => {
  const { items, onChange, text, value } = props;

  return (
    <MenuSelect<T>
      onChange={onChange}
      positioning={{ placement: 'bottom-end' }}
      listStatus={value as T}
    >
      <MenuSelectTrigger>
        <Button variant="ghost" aria-label="Sort tasks" size="xs">
          <Icon icon="sort" />
          Sort{text}
        </Button>
      </MenuSelectTrigger>
      <MenuSelectList>
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
