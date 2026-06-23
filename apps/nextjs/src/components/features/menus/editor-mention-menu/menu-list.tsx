import { memo, useCallback, useEffect, useState } from 'react';
import { SearchMenuLoading } from '@/components/features/menus/search-menu';
import { useDebounce } from '@/hooks';
import { MentionItem } from './mention-item';
import { Empty } from './mention-item/empty';
import {
  type SetValueParam,
  useEditorMentionMenu,
} from './use-editor-mention-menu';

export const MenuList = memo(function MenuList() {
  const { mentions, setValue, refetch, query } = useEditorMentionMenu();
  const [hasChangedQuery, setHasChangedQuery] = useState<number>(0);
  const [searching, setSearching] = useState<boolean>(true);

  useEffect(() => {
    if (!query) return;
    setSearching(true);
    setHasChangedQuery((prev) => prev + 1);
  }, [query]);

  const handleDebounce = useCallback(async () => {
    await refetch({ queryText: query });

    // TODO: avoid duplicated rendering.
    setTimeout(() => {
      setSearching(false);
    }, 100);
  }, [query, refetch]);

  useDebounce(hasChangedQuery, handleDebounce, 500);

  const handleClick = useCallback(
    (val: SetValueParam) => {
      setValue(val);
    },
    [setValue],
  );

  if (searching) return <SearchMenuLoading />;
  if (!searching && mentions.length === 0)
    return (
      <Empty>Mention a teammate or link to a task, project, or message.</Empty>
    );

  return (
    <>
      {mentions.map((m, i) => (
        <MentionItem
          onClick={handleClick}
          mention={m}
          key={`${m.type}_${m.id}`}
          index={i}
        />
      ))}
    </>
  );
});
