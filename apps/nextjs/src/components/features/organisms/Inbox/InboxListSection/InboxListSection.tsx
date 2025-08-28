import { Flex, type FlexProps } from '@/components/ui/atoms';
import { memo } from 'react';
import { InboxListHeader } from '../InboxListHeader';
import { InboxListItem } from '../InboxListItem';

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
