import { SearchMenuLoading } from '@/components/features/organisms/Menus/SearchMenu';
import { useDebounce } from '@/hooks';
import { memo, useCallback, useEffect, useState } from 'react';
import { MentionItem } from './MentionItem';
import { Empty } from './MentionItem/Empty';
import {
  type SetValueParam,
  useEditorMentionMenu,
} from './useEditorMentionMenu';

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
