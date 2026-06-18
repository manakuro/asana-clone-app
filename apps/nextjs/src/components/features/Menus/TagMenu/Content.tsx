import { memo, useCallback } from 'react';
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuLoading,
  SearchMenuRightContainer,
  useSearchMenu,
} from '@/components/features/Menus/SearchMenu';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import type { Tag } from '@/store/entities/tag';
import { TagItem } from './TagItem';
import { useSearchTagsQuery } from './useSearchTagsQuery';

type Props = {
  onSelect: (tag: Tag) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
};

export const Content = memo(function Content(props: Props) {
  const { queryText, onSelect, onClose, onClosed } = props;
  const { refetch, tags, loading: loadingQuery } = useSearchTagsQuery();

  const handleDebounce = useCallback(
    async (val: string) => {
      await refetch({ queryText: val });
    },
    [refetch],
  );

  const handleSelect = useCallback(
    (tag: Tag) => {
      onSelect(tag);
      onClose();
      onClosed?.();
    },
    [onClose, onClosed, onSelect],
  );

  const { loading } = useSearchMenu({
    items: tags,
    loadingQuery,
    queryText,
    onSelect: handleSelect,
    onDebounce: handleDebounce,
  });

  if (loading) return <SearchMenuLoading />;

  return (
    <>
      {tags.map((t, i) => (
        <TagItem key={t.id} onClick={handleSelect} tag={t} index={i} />
      ))}
      <Separator />
      <SearchMenuListItem index={tags.length}>
        <SearchMenuLeftContainer>
          <Icon icon="plus" color="primary" />
        </SearchMenuLeftContainer>
        <SearchMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            {`Create tag for '${queryText}'`}
          </Text>
        </SearchMenuRightContainer>
      </SearchMenuListItem>
    </>
  );
});
