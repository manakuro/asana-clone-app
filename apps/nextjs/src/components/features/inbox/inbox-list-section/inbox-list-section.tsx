import { memo } from 'react';
import { Flex, type FlexProps } from '@/components/ui/flex';
import { InboxListHeader } from '../inbox-list-header';
import { InboxListItem } from '../inbox-list-item';

type Props = FlexProps & {
  listItemIds: string[];
  sectionText: string;
};

export const InboxListSection = memo(function InboxListSection(props: Props) {
  const { listItemIds, sectionText, ...rest } = props;

  if (!listItemIds.length) return null;

  return (
    <Flex flexDirection="column" flex={1} {...rest}>
      <InboxListHeader>{sectionText}</InboxListHeader>
      {listItemIds.map((id) => (
        <InboxListItem listItemId={id} key={id} />
      ))}
    </Flex>
  );
});
