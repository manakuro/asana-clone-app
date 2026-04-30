import {
  MenuSelect,
  MenuSelectList,
  MenuSelectTrigger,
} from '@/components/features/Menus';
import { Button } from '@/components/ui/Button';
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
