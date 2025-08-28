import { useSearchProjectsQuery } from '@/components/features/organisms/Menus/ProjectMenu/useSearchProjectsQuery';
import {
  SearchMenuLeftContainer,
  SearchMenuListItem,
  SearchMenuLoading,
  SearchMenuRightContainer,
  useSearchMenu,
} from '@/components/features/organisms/Menus/SearchMenu';
import { Divider, Icon, Text } from '@/components/ui/atoms';
import { useFirstRender } from '@/hooks';
import type { Project } from '@/store/entities/project';
import { memo, useCallback, useEffect } from 'react';
import { ProjectItem } from './ProjectItem';

type Props = {
  onSelect: (val: string) => void;
  queryText: string;
  onClose: () => void;
  onClosed?: () => void;
  immediate?: boolean;
};

export const Content = memo(function Content(props: Props) {
  const { queryText, onSelect, onClose, onClosed, immediate } = props;
  const { refetch, projects, loading: loadingQuery } = useSearchProjectsQuery();
  const { firstRender } = useFirstRender();

  useEffect(() => {
    if (immediate && firstRender) refetch({ queryText: '' });
  }, [immediate, refetch, firstRender]);

  const handleDebounce = useCallback(
    async (val: string) => {
      await refetch({ queryText: val });
    },
    [refetch],
  );

  const handleSelect = useCallback(
    (val: string) => {
      onSelect(val);
      onClose();
      onClosed?.();
    },
    [onClose, onClosed, onSelect],
  );

  const handleSelectOnKey = useCallback(
    (item: Project) => {
      handleSelect(item.id);
    },
    [handleSelect],
  );

  const { loading } = useSearchMenu({
    items: projects,
    loadingQuery,
    queryText,
    onSelect: handleSelectOnKey,
    onDebounce: handleDebounce,
  });

  if (loading) return <SearchMenuLoading />;

  return (
    <>
      {projects.map((p, i) => (
        <ProjectItem key={p.id} onClick={handleSelect} project={p} index={i} />
      ))}
      <Divider />
      <SearchMenuListItem index={projects.length}>
        <SearchMenuLeftContainer>
          <Icon icon="plus" color="primary" />
        </SearchMenuLeftContainer>
        <SearchMenuRightContainer>
          <Text fontSize="sm" color="primary" fontWeight="medium">
            {`Create project for '${queryText}'`}
          </Text>
        </SearchMenuRightContainer>
      </SearchMenuListItem>
    </>
  );
});
