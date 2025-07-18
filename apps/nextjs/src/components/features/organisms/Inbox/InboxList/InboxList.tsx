import type React from 'react';
import { memo, useMemo } from 'react';
import {
  type UseInboxListItemIdsKeys,
  useInboxListItemIds,
} from 'src/components/features/organisms/Inbox';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { InboxListSection } from '../InboxListSection';
import { useInboxList } from './useInboxList';

type Props = FlexProps;

export const InboxList: React.FC<Props> = memo<Props>((props) => {
  const { listItemIds } = useInboxListItemIds();
  const firstListItemId = useMemo(() => {
    const key =
      (Object.keys(listItemIds) as UseInboxListItemIdsKeys[]).find(
        (k) => !!listItemIds[k].length,
      ) || 'today';
    return listItemIds[key][0];
  }, [listItemIds]);

  useInboxList({ listItemId: firstListItemId });

  return (
    <Flex flexDirection="column" flex={1} maxWidth="full" {...props}>
      <InboxListSection listItemIds={listItemIds.today} sectionText="Today" />
      <InboxListSection
        listItemIds={listItemIds.yesterday}
        sectionText="Yesterday"
      />
      <InboxListSection
        listItemIds={listItemIds.pastSevenDays}
        sectionText="Past 7 days"
      />
      <InboxListSection
        listItemIds={listItemIds.earlier}
        sectionText="Earlier"
      />
    </Flex>
  );
});

InboxList.displayName = 'InboxList';
