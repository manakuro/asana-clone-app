import { memo, useCallback, useMemo } from 'react';
import {
  MenuSelect,
  MenuSelectList,
  MenuSelectTrigger,
} from '@/components/features/Menus';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Menu } from '@/components/ui/menu';
import type { SystemStyleObject } from '@/shared/chakra';
import {
  INBOX_LIST_FILTER_STATUS_TYPE_ALL,
  INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_BY_ME,
  INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_TO_ME,
  INBOX_LIST_FILTER_STATUS_TYPE_MENTIONED,
  INBOX_LIST_FILTER_STATUS_TYPE_UNREAD_ONLY,
  type InboxListFilterStatuses,
  useInboxListStatus,
} from '@/store/app/inbox/activity/inboxListStatus';

const items: {
  value: InboxListFilterStatuses;
  text: string;
}[] = [
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_ALL,
    text: 'All',
  },
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_TO_ME,
    text: 'Assigned To Me',
  },
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_MENTIONED,
    text: '@Mentioned',
  },
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_BY_ME,
    text: 'Assigned By Me',
  },
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_UNREAD_ONLY,
    text: 'Unread only',
  },
];

export const FilterButton = memo(function FilterButton() {
  const { onFilter, filterStatus, isFiltered } = useInboxListStatus();

  const handleChange = useCallback(
    (status: ToString<InboxListFilterStatuses>) => {
      onFilter(Number(status) as InboxListFilterStatuses);
    },
    [onFilter],
  );
  const isActiveButton = useMemo(() => !isFiltered('all'), [isFiltered]);
  const buttonStyle = useMemo(
    (): SystemStyleObject => ({
      ...(isActiveButton ? { bg: 'teal.100', _hover: { bg: 'teal.100' } } : {}),
    }),
    [isActiveButton],
  );

  const text = useMemo<string>(() => {
    if (isFiltered('all')) return '';

    return `: ${items.find((i) => i.value === filterStatus)?.text}`;
  }, [isFiltered, filterStatus]);

  return (
    <MenuSelect<ToString<InboxListFilterStatuses>>
      onChange={handleChange}
      positioning={{ placement: 'bottom-start' }}
      listStatus={filterStatus as unknown as ToString<InboxListFilterStatuses>}
    >
      <MenuSelectTrigger>
        <Button
          variant="ghost"
          aria-label="Sort tasks"
          size="xs"
          {...buttonStyle}
        >
          <Icon icon="filter" />
          Filter{text}
        </Button>
      </MenuSelectTrigger>
      <MenuSelectList>
        {items.map((item, _i) => (
          <Menu.RadioItem
            value={item.value.toString()}
            key={item.value.toString()}
            disabled
          >
            {item.text}
            <Menu.ItemIndicator />
          </Menu.RadioItem>
        ))}
      </MenuSelectList>
    </MenuSelect>
  );
});
